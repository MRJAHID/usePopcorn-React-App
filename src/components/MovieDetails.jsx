import React, {useEffect, useRef, useState} from 'react';
import StarRating from "./StarRating";
import Loader from "./Loader";
import {useKey} from "../useKey";

const MovieDetails = ({KEY, watched, selectedID, onCloseMovie, onAddWatched}) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');

    const countRef = useRef(0);
    useEffect(() => {
        if (userRating) countRef.current += 1;
    }, [userRating])

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedID);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedID)?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;


    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedID,
            year,
            title,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split("").at(0)),
            userRating,
            countRatingDecision: countRef.current,
        }

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(() => {
        setIsLoading(true);

        async function getMovieDetails() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }

        getMovieDetails();
    }, [KEY, selectedID]);

    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;

        // useEffect Cleaning Function
        return function () {
            document.title = 'usePopcorn';
        }
    }, [title]);

    useKey('Escape', onCloseMovie);

    return (
        <div className="details">
            {isLoading ? (
                <Loader/>
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />

                                    <button className="btn-add" onClick={handleAdd}>
                                        + Add to list
                                    </button>
                                </>
                            ) : (
                                <p>
                                    You rated with movie {watchedUserRating} <span>⭐️</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
