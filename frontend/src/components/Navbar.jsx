import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";

function Navbar()
{
    
    const {selectedUser, updateSelectedUser, profileInfo} = useContext(AuthContext);
    
    return <div className="navbar">
            <ul className="left">
                <li><img src="./netflixlogo.png" alt="" /></li>
                <li><a href="/browser">Home</a></li>
                <li><a href="">TV Shows</a></li>
                <li><a href="">Movies</a></li>
                <li><a href="/mylist">My List</a></li>
            </ul>
            <ul className="right">
                <li className="left-search"><input type="text" /><SearchIcon/></li>
                <li className="right-img"><img src={selectedUser.avatar_url} alt="" /><p>{selectedUser.name}</p><div className="arrowDrop"><ArrowDropDownIcon /></div>
                <div className="scroll-down"><div className="drop-up"><ArrowDropUpOutlinedIcon /></div><div className="scroll-down-block">{profileInfo.map((profile)=><div className="scrolldown-profile" onClick={()=>{updateSelectedUser(profile)}}><Link href="/browser"><img src={profile.avatar_url}></img>{profile.name}</Link></div>)} <div><a href="/manageProfile"><EditOutlinedIcon />Manage Profile</a><a href="/manageProfile"><ExitToAppIcon />Sign out</a></div></div></div></li>
            </ul>
    </div>
}

export default Navbar;