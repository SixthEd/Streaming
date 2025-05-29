import React, { useCallback, useContext, useState } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Movies() {
    const {setSelectedMovie} = useContext(AuthContext);
    
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

    const streaming = useCallback(()=>{
        setSelectedMovie("neon.mp4");
        navigate("/video")

    },[])

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
     
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-c">
                        <img src="neon.jpg" alt="" />
                        <div className="card-content" >
                            <div>
                                <PlayCircleIcon sx={{ fontSize: 45 }} onClick={()=>{streaming()}}/>
                                <AddCircleOutlineOutlinedIcon  sx={{ fontSize: 45 }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
}

export default Movies;