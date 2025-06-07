import React, { useCallback, useContext, useEffect, useState } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import SideInfo from "./SideInfo.jsx";
import axiosInstance from "../utils.js";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

function MyList(props) {
    const { setSelectedMovie, loadingProfiles, selectedUser, setSelectedUser } = useContext(AuthContext);
    const [toggleSideinfo, setToggleSideInfo] = useState(false);
    const [myList, setMyList] = useState(null);
    const [sideSelectedMovie, setSideSelectedMovie] = useState(null);
    const navigate = useNavigate();


    const updateToggleSideInfo = useCallback((info) => {
        console.log(info)
        setSideSelectedMovie(info)
        setToggleSideInfo((old) => !old)
        // if(!toggleSideinfo){
        //    setSelectedMovie(null)
        // }
        // else
        // {
        //    setSelectedMovie(info)
        // }


    }, [])


    const streaming = useCallback(async (info) => {

        await axiosInstance.get("/movieTrailer", {
            params: {
                info
            }
        }).then((response) => { setSelectedMovie(response.data) }).catch((err) => { console.log(err) })

        navigate("/video")

    }, [])

    const removeMovie = useCallback((info) => {
        setMyList((old) => old.filter((oldmovie) => (oldmovie.movieid !== info)))
        axiosInstance.delete("/removemovie", { data: { id: info, profileId: JSON.parse(localStorage.getItem("selectedUser")).profile_id } }).then((response) => console.log(response.data)).catch((err) => { console.log(err) });
    })

    useEffect(() => {
        const storedUser = localStorage.getItem("selectedUser");
        if (storedUser) {
            setSelectedUser(JSON.parse(storedUser));
        }
    }, []); // run only once when component mounts

    useEffect(() => {
        if (selectedUser) {
            axiosInstance
                .get("/mymovies", {
                    params: { profileId: selectedUser.profile_id },
                })
                .then((response) => {
                    setMyList(response.data);
                    console.log(response.data.map((movie) => movie.id)); // or movie.movieid depending on your backend
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [selectedUser]);

    return <div className="mylist">
        {toggleSideinfo && <SideInfo sideInfo={updateToggleSideInfo} movieInfo={sideSelectedMovie} />}
        {loadingProfiles ?
            <span className="loader"></span> :
            <div>
                <Navbar />

                <div className="mylist-para"><p>My List</p></div>
                <div className="movies">
                </div>
                <div className="mylist-card">
                    <div className="mylist-cardls">
                        {myList && myList.map((movie, i) => (<div className="card-wrapper" key={i}>
                            <div className="card">
                                <div className="card-c">
                                    <div className="mylist-img-video">
                                        <img src={movie.logo} alt="" />
                                        <video src="" poster={movie.poster} alt="" > </video>
                                    </div>
                                    <div className="card-content" >
                                        <div className="card-subContent">
                                            <div>
                                                <PlayCircleIcon sx={{ fontSize: 45, fill: "white" }} onClick={() => { streaming(movie.movieid) }} />
                                                <HighlightOffOutlinedIcon sx={{ fontSize: 45, fill: "white" }} onClick={() => { removeMovie(movie.movieid,) }} />
                                            </div>
                                            <div>
                                                <ExpandCircleDownOutlinedIcon sx={{ fontSize: 45, fill: "white" }} onClick={() => { updateToggleSideInfo({ inlist: true, year: movie.year, title: movie.title, maturityDescription: movie.maturity_description, specificRatingReason: movie.specific_rating_reason, tags: movie.tags, poster: movie.poster, image: movie.logo, videoId: movie.movieid, cast: movie.casting, genres: movie.genres, rating: movie.rating, context: movie.context }) }} />
                                            </div>
                                        </div>
                                        <div className="subContent-Context">
                                            <div ><span>{movie.rating}</span></div>
                                            <div className="subContent-p">{movie.tags.map((tag,i) => <li key={i}>{tag.name}</li>)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                        <div className="mylist-bottom"></div>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default MyList;