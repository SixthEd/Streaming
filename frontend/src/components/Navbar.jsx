import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

function Navbar()
{
    const {selectedUser} = useContext(AuthContext);

    return <div className="navbar">
            <ul className="left">
                <li><img src="./netflixlogo.png" alt="" /></li>
                <li><a href="/browser">Home</a></li>
                <li><a href="">TV Shows</a></li>
                <li><a href="">Movies</a></li>
                <li><a href="">My List</a></li>
            </ul>
            <ul className="right">
                <li className="left-search"><input type="text" /><SearchIcon className="search" /></li>
                <li className="right-img"><img src={selectedUser.avatar_url} alt="" /><div className="arrowDrop"><ArrowDropDownIcon /></div></li>
            </ul>
    </div>
}

export default Navbar;