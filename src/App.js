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

const KEY = 'c873b0f1';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(function () {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstjsjsjsjkellar`);

                if (!res.ok) {
                    throw new Error('Something went wrong with fetching the movies')
                }

                const data = await res.json();
                if (data.Response === 'False') throw new Error('Movie Not Found')

                setMovies(data.Search);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
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
                    {/*{isLoading ? <Loader/> : <MovieList movies={movies}/>}*/}
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    <WatchedSummary watched={watched}/>
                    <WatchedMovieList watched={watched}/>
                </Box>
            </Main>
        </>
    );
}