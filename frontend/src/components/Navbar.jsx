import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";
import { useNavigate, createSearchParams } from "react-router-dom";

function Navbar() {

    const { selectedUser, updateSelectedUser, profileInfo, updateSearchMovie, searchMovie } = useContext(AuthContext);
    const navigate = useNavigate();

    const navigateToSearch = () => {
        navigate({
            pathname: '/search',
            search: `?${createSearchParams({ q: searchMovie })}`,
        });
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigateToSearch();
    };


    return <div className="navbar">
        <ul className="left">
            <li><img src="./netflixlogo.png" alt="" /></li>
            <li><a href="/browser">Home</a></li>
            <li><a href="tvshows">TV Shows</a></li>
            <li><a href="/cinema">Movies</a></li>
            <li><a href="/anime">Anime</a></li>
            <li><a href="/mylist">My List</a></li>
        </ul>
        <ul className="right">
            <li className="left-search">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        onChange={(e) => updateSearchMovie(e.target.value)}
                        value={searchMovie}
                        placeholder="Enter a movie"
                        required
                    />
                    <button type="submit">
                        <SearchIcon sx={{fill:"white"}}/>
                    </button>
                </form>
            </li>
            <li className="right-img"><img src={selectedUser.avatar_url} alt="" /><p>{selectedUser.name}</p><div className="arrowDrop"><ArrowDropDownIcon /></div>
                <div className="scroll-down">
                    <div className="drop-up"> <ArrowDropUpOutlinedIcon /></div>
                    <div className="scroll-down-block">{profileInfo.map((profile, i) => <div className="scrolldown-profile" key={i} onClick={() => { updateSelectedUser(profile) }}><Link href="/browser"><img src={profile.avatar_url}></img>{profile.name}</Link></div>)} <div>
                        <a href="/manageProfile"><EditOutlinedIcon />Manage Profile</a>
                        <a href="/watching" onClick={(e) => { e.preventDefault(); localStorage.removeItem("selectedUser"); localStorage.removeItem("user"); window.location.href = "/watching"; }}>
                            <ExitToAppIcon />Sign out</a>
                    </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
}

export default Navbar;