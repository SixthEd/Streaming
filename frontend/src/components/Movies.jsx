import React, { useCallback, useContext, useState, useEffect } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import axiosInstance from "../utils";


function Movies(props) {
    const { setSelectedMovie } = useContext(AuthContext);

    const [holdMovies, setHoldMovies] = useState(false);

    const navigate = useNavigate();

    const CARD_WIDTH = 96; // in vw
    const TOTAL_CARDS = 3.6;
    const VISIBLE_CARDS = 1;
    const MAX_SCROLL = -((TOTAL_CARDS - VISIBLE_CARDS) * CARD_WIDTH); // -295.323vw

    const [leftScroll, setLeftScroll] = useState(3.6);

    const rightScrolling = useCallback(() => {
        setLeftScroll(prev => (prev <= MAX_SCROLL ? 3.6 : prev - CARD_WIDTH));
    }, []);

    const leftScrolling = useCallback(() => {
        setLeftScroll(prev => (prev >= 3.6 ? MAX_SCROLL : prev + CARD_WIDTH));
    }, []);

    const streaming = useCallback(async (info) => {

        await axiosInstance.get("/movieTrailer", {
            params: {
                info
            }
        }).then((response) => { setSelectedMovie(response.data) }).catch((err) => { console.log(err) })

        navigate("/video")

    }, [])


    useEffect(() => {
        if (props.movies) {
            setHoldMovies(true)
        }
    })

    return <div className="movie-card">
        <div className="title">
            <h2>Movie</h2></div>
        <div
            className="left-scroll"
            style={{ display: leftScroll === 0 ? "none" : "flex" }}
            onClick={leftScrolling}
        >
            <KeyboardArrowLeftOutlinedIcon sx={{ width: "3.4em", height: "2em" }} />
        </div>

        <div
            className="right-scroll"
            onClick={rightScrolling}
        >
            <ChevronRightOutlinedIcon sx={{ width: "3.4em", height: "2em" }} />
        </div>
        <div className="card-list" style={{
            transform: `translateX(${leftScroll}vw)`
        }}>

            {holdMovies && props.movies.map((movie) => < div className="card-wrapper">
                <div className="card">
                    <div className="card-c">
                        <div className="img-video"><img src={movie.jawSummary.logoImage.url} alt="" /><video poster={movie.jawSummary.backgroundImage.url}></video></div>
                        <div className="card-content" >
                            <div className="card-subContent">
                                <div>
                                    <PlayCircleIcon sx={{ fontSize: 45 }} onClick={() => { streaming(movie.jawSummary.trackIds.videoId) }} />
                                    <AddCircleOutlineOutlinedIcon sx={{ fontSize: 45 }} />
                                </div>
                                <div>
                                    <ExpandCircleDownOutlinedIcon sx={{ fontSize: 45 }} onClick={() => { props.sideInfo({ tags:movie.jawSummary.tags ,poster: movie.jawSummary.backgroundImage.url, image: movie.jawSummary.logoImage.url, videoId: movie.jawSummary.trackIds.videoId, cast: movie.jawSummary.cast, genres: movie.jawSummary.genres, rating: movie.jawSummary.maturity.rating.value, context: movie.jawSummary.contextualSynopsis.text }) }} />
                                </div>
                            </div>
                            <div ><span>{movie.jawSummary.maturity.rating.value}</span></div>
                            <div className="subContent-p">{movie.jawSummary.genres.map((genre) => <li>{genre.name}</li>)}</div>
                        </div>
                    </div>
                </div>
            </div>)
            }
        </div>
    </div >
}

export default Movies;