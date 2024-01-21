import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

const KEY = 'c873b0f1';

export default function App() {
    const [query, setQuery] = useState("viking");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedID, setSelectedID] = useState(null);

    function handleSelectedMovie(id) {
        setSelectedID((selectedID) => id === selectedID ? null : id);
    }

    function handleCloseMovie() {
        setSelectedID(null);
    }
    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    useEffect(function () {
        const controller = new AbortController();
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

                if (!res.ok) {
                    throw new Error('Something went wrong with fetching the movies')
                }

                const data = await res.json();
                if (data.Response === 'False') throw new Error('Movie Not Found')

                setMovies(data.Search);
                setError('');

            } catch (e) {
                if (e.name !== 'AbortError'){
                    setError(e.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }

        fetchMovies();
        return function(){
            controller.abort();
        };
    }, [query]);

    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery}/>
                <NumResults movies={movies}/>
            </Navbar>
            <Main>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectedMovie={handleSelectedMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    {
                        selectedID ? <MovieDetails KEY={KEY} selectedID={selectedID} onCloseMovie={handleCloseMovie} watched={watched} onAddWatched={handleAddWatched}/>
                            :
                            <>
                                <WatchedSummary watched={watched}/>
                                <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched} />
                            </>
                    }
                </Box>
            </Main>
        </>
    )
        ;
}