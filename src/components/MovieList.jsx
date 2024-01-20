import React from 'react';
import Movie from "./Movie";

const MovieList = ({movies, onSelectedMovie}) => {

    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie movie={movie} onSelectedMovie={onSelectedMovie} key={movie.imdbID}/>
            ))}
        </ul>
    );
};

export default MovieList;