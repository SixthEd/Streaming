import React, { useCallback, useContext, useEffect, useState } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";


function MyList() {
    const { setSelectedMovie, loadingProfiles, profileInfo, setSelectedUser } = useContext(AuthContext);


    const navigate = useNavigate();

    const streaming = useCallback(() => {
        setSelectedMovie("neon.mp4");
        navigate("/video")

    }, [])

    useEffect(() => {
        if (localStorage.getItem("selectedUser")) {
            console.log(localStorage.getItem("selectedUser"))
            setSelectedUser(JSON.parse(localStorage.getItem("selectedUser")))
        }
    }, [])

    return <div className="mylist">
        {loadingProfiles ?
            <span className="loader"></span> :
            <div>
                <Navbar />

                <div className="mylist-para"><p>My List</p></div>
                <div className="movies">


                </div>
                <div className="mylist-card">
                    <div className="mylist-cardls">
                        <div className="card-wrapper">
                            <div className="card">
                                <div className="card-c">
                                    <img src="neon.jpg" alt="" />
                                    <div className="card-content" >
                                        <div>
                                            <PlayCircleIcon sx={{ fontSize: 45, fill: "white" }} onClick={() => { streaming() }} />
                                            <AddCircleOutlineOutlinedIcon sx={{ fontSize: 45, fill: "white" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mylist-bottom"></div>

            </div>

        }
    </div>
}

export default MyList;