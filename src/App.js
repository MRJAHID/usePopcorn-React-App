import React, { useState} from "react";
import {useLocalStorageState} from "./useLocalStorageState.js";
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
import {useMovies} from "./useMovies";

const KEY = 'c873b0f1';


export default function App() {
    const [query, setQuery] = useState("");
    const [selectedID, setSelectedID] = useState(null);
    const [watched, setWatched] = useLocalStorageState([], 'watched')

    const {movies, error, isLoading} = useMovies(query, handleCloseMovie);

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
                        selectedID ? <MovieDetails KEY={KEY} selectedID={selectedID} onCloseMovie={handleCloseMovie}
                                                   watched={watched} onAddWatched={handleAddWatched}/>
                            :
                            <>
                                <WatchedSummary watched={watched}/>
                                <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched}/>
                            </>
                    }
                </Box>
            </Main>
        </>
    )
        ;
}
