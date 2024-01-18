import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import {tempMovieData, tempWatchedData} from "./data";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";

const KEY = 'c873b0f1';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchMovies() {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`);
            const data = await res.json();
            setMovies(data.Search);
            setIsLoading(false);
        }

        fetchMovies();
    }, []);

    return (
        <>
            <Navbar>
                <Search/>
                <NumResults movies={movies}/>
            </Navbar>
            <Main>
                <Box>
                    {isLoading ? <Loader/> : <MovieList movies={movies}/>}
                </Box>
                <Box>
                    <WatchedSummary watched={watched}/>
                    <WatchedMovieList watched={watched}/>
                </Box>
            </Main>
        </>
    );
}