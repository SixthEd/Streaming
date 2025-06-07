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
    const { setSelectedMovie , updateMyList} = useContext(AuthContext);

    const [holdMovies, setHoldMovies] = useState(false);

    const navigate = useNavigate();

    const CARD_WIDTH = 96; // in vw
    const TOTAL_CARDS = 7;
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
            <h2>{props.movies?.genre}</h2></div>
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

            {holdMovies && props.movies.data.titles.map((movie,i) => < div className="card-wrapper" key={movie.summary.id}>
                <div className="card">
                    <div className="card-c">
                        <div className="img-video"><img src={movie.jawSummary.logoImage.url} alt="" /><video poster={movie.jawSummary.backgroundImage.url}></video></div>
                        <div className="card-content" >
                            <div className="card-subContent">
                                <div>
                                    <PlayCircleIcon sx={{ fontSize: 45 }} onClick={() => { streaming(movie.jawSummary.trackIds.videoId) }} />
                                    <AddCircleOutlineOutlinedIcon sx={{ fontSize: 45 }} onClick={()=>{updateMyList({profileId: JSON.parse(localStorage.getItem("selectedUser")).profile_id ,id:movie.summary.id ,logo:movie.jawSummary.logoImage.url, year: movie.jawSummary.releaseYear,title: movie.jawSummary.title  ,maturityDescription : movie.jawSummary.maturity.rating.maturityDescription ,specificRatingReason : movie.jawSummary.maturity.rating.specificRatingReason,tags: movie.jawSummary.tags, poster: movie.jawSummary.backgroundImage.url, image: movie.jawSummary.logoImage.url, videoId: movie.jawSummary.trackIds.videoId, cast: movie.jawSummary.cast, genres: movie.jawSummary.genres, rating: movie.jawSummary.maturity.rating.value, context: movie.jawSummary.contextualSynopsis.text})}} />
                                </div>
                                <div>
                                    <ExpandCircleDownOutlinedIcon sx={{ fontSize: 45 }} onClick={() => { props.sideInfo({ 
                                      id:movie.summary.id ,logo:movie.jawSummary.logoImage.url, year: movie.jawSummary.releaseYear,title: movie.jawSummary.title  ,maturityDescription : movie.jawSummary.maturity.rating.maturityDescription ,specificRatingReason : movie.jawSummary.maturity.rating.specificRatingReason,tags: movie.jawSummary.tags, poster: movie.jawSummary.backgroundImage.url, image: movie.jawSummary.logoImage.url, videoId: movie.jawSummary.trackIds.videoId, cast: movie.jawSummary.cast, genres: movie.jawSummary.genres, rating: movie.jawSummary.maturity.rating.value, context: movie.jawSummary.contextualSynopsis.text }) }} />
                                </div>
                            </div>
                            <div className="subContent-Context">
                                <div ><span>{movie.jawSummary.maturity.rating.value}</span></div>
                                <div className="subContent-p">{movie.jawSummary.tags.map((tag,i) => <li key={i}>{tag.name}</li>)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
            }
        </div>
    </div >
}

export default Movies;