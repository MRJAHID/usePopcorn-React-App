import React from 'react';
import Search from "./Search";
import NumResults from "./NumResults";
import Logo from "./Logo";

const Navbar = ({movies}) => {

    return (
        <nav className="nav-bar">
            <Logo/>
            <Search/>
            <NumResults movies={movies}/>
        </nav>
    );
};

export default Navbar;