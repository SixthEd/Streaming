

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import SideInfo from "./SideInfo.jsx";
import axiosInstance from "../utils.js";
// import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Search(props) {
    const { setSelectedMovie, loadingProfiles, selectedUser, setSelectedUser, updateMyList, searchMovie } = useContext(AuthContext);
    const [toggleSideinfo, setToggleSideInfo] = useState(false);
    const [searchList, setSearchList] = useState(null);
    const [sideSelectedMovie, setSideSelectedMovie] = useState(null);
    const [loadingScreen, setLoadingScreen] = useState(true)
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');


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

    const navigate = useNavigate();

    const streaming = useCallback(async (info) => {

        await axiosInstance.get("/movieTrailer", {
            params: {
                info
            }
        }).then((response) => { setSelectedMovie(response.data) }).catch((err) => { console.log(err) })

        navigate("/video")

    }, [])


    useEffect(() => {
        const storedUser = localStorage.getItem("selectedUser");
        if (storedUser) {
            setSelectedUser(JSON.parse(storedUser));
        }
    }, []); // run only once when component mounts

    useEffect(() => {

        if (query) {
            setSearchList(null);
            axiosInstance
                .get("/genre",
                    {
                        params: {
                            genre: searchMovie
                        }
                    }
                )
                .then((response) => {
                    setSearchList(response.data.titles);
                    console.log(response.data.titles)
                    // console.log(response.data.map((movie) => movie.id)); // or movie.movieid depending on your backend
                })
                .catch((err) => {
                    console.error(err);
                });
            setLoadingScreen(false)
        }

    }, [query]);

    return <div className="mylist">
        {toggleSideinfo && <SideInfo sideInfo={updateToggleSideInfo} movieInfo={sideSelectedMovie} />}
        <div>
            <Navbar />

            <div className="mylist-para"><p>{query?query.toUpperCase()[0] + query.slice(1, query.length):""}</p></div>
            <div className="movies">
            </div>
            <div className="mylist-card">
                <div className="mylist-cardls">
                    {searchList && !loadingScreen ? searchList.map((show,i) => (<div className="card-wrapper" key={i}>
                        <div className="card">
                            <div className="card-c">
                                <div className="mylist-img-video">
                                    <img src={show.jawSummary.logoImage?.url} alt="" />
                                    <video src="" poster={show.jawSummary.backgroundImage?.url} alt="" > </video>
                                </div>
                                <div className="card-content" >
                                    <div className="card-subContent">
                                        <div>
                                            <PlayCircleIcon sx={{ fontSize: 45, fill: "white" }} onClick={() => { streaming(show.summary.id) }} />
                                            <AddCircleOutlineOutlinedIcon sx={{ fontSize: 45, fill: "white" }} onClick={() => { updateMyList({ profileId: JSON.parse(localStorage.getItem("selectedUser")).profile_id, id: show.summary.id, logo: show.jawSummary.logoImage.url, year: show.jawSummary.releaseYear, title: show.jawSummary.title, maturityDescription: show.jawSummary.maturity.rating.maturityDescription, specificRatingReason: show.jawSummary.maturity.rating.specificRatingReason, tags: show.jawSummary.tags, poster: show.jawSummary.backgroundImage.url, image: show.jawSummary.logoImage.url, videoId: show.jawSummary.trackIds.videoId, cast: show.jawSummary.cast, genres: show.jawSummary.genres, rating: show.jawSummary.maturity.rating.value, context: show.jawSummary.contextualSynopsis.text }) }} />

                                        </div>
                                        <div>
                                            <ExpandCircleDownOutlinedIcon sx={{ fontSize: 45, fill: "white" }} onClick={() => { updateToggleSideInfo({ profileId: JSON.parse(localStorage.getItem("selectedUser")).profile_id, id: show.summary.id, logo: show.jawSummary.logoImage.url, year: show.jawSummary.releaseYear, title: show.jawSummary.title, maturityDescription: show.jawSummary.maturity.rating.maturityDescription, specificRatingReason: show.jawSummary.maturity.rating.specificRatingReason, tags: show.jawSummary.tags, poster: show.jawSummary.backgroundImage.url, image: show.jawSummary.logoImage.url, videoId: show.jawSummary.trackIds.videoId, cast: show.jawSummary.cast, genres: show.jawSummary.genres, rating: show.jawSummary.maturity.rating.value, context: show.jawSummary.contextualSynopsis.text }) }} />
                                        </div>
                                    </div>
                                    <div className="subContent-Context">
                                        <div ><span>{show.jawSummary.maturity.rating.value}</span></div>
                                        <div className="subContent-p">{show.jawSummary.tags.map((tag,i) => <li key={i}>{tag.name}</li>)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)) : <div className="tv-progress">
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress size={100} color="white" />
                        </Box>
                    </div>}
                    <div className="mylist-bottom"></div>
                </div>
            </div>
        </div>

    </div>
}


export default Search;