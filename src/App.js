import Navbar from "./components/Navbar";
import Main from "./components/Main";
import React, {useState} from "react";
import {tempMovieData} from "./data";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import ListBox from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import MovieList from "./components/MovieList";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);


    return (
        <>
            <Navbar>
                <Search/>
                <NumResults movies={movies}/>
            </Navbar>
            <Main>
                <ListBox>
                    <MovieList movies={movies}/>
                </ListBox>
                <WatchedBox />
            </Main>
        </>
    );
}