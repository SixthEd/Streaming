import React, { useContext, useCallback } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { AuthContext } from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../utils";

function SideInfo(props) {

   const navigate = useNavigate();

   const streaming = useCallback(async (info) => {

      await axiosInstance.get("/movieTrailer", {
         params: {
            info
         }
      }).then((response) => { setSelectedMovie(response.data) }).catch((err) => { console.log(err) })

      navigate("/video")

   }, [])


   const { selectedMovie, setSelectedMovie } = useContext(AuthContext)
   return <div className="sideInformation">
      <div className="side-info-card">
         <div className="side-cardinfo">
            <div className="side-cardinfo-video">
               <div className="side-img-video"><img src={props.movieInfo.image} alt="" /><video poster={props.movieInfo.poster}></video></div>

               <div className="b"><CloseIcon sx={{ fontSize: 30 }} onClick={() => { props.sideInfo(); }} /></div>
               <div className="c">
                  <button className="play-arrow" onClick={() => { streaming(props.movieInfo.videoId) }}><div><PlayArrowIcon sx={{ fontSize: 50 }} /></div><p>Play</p></button>
                  <div><AddCircleOutlineOutlinedIcon sx={{ fontSize: 50 }} /></div>
               </div>
            </div>
            <div className="side-cardinfo-content">
               <div className="side-cardinfo-top">
                  <div className="left">
                     <p className="dob-time">1999 3h 8m</p>
                     <p><span className="rating">{props.movieInfo.rating}</span><span> {props.movieInfo.tags.map((tag) => tag.name + " , ")}</span></p>
                     <p>{props.movieInfo.context}</p>
                  </div>
                  <div className="right">
                     <p><span className="cast">Cast : <span>{props.movieInfo.cast.map((c) => c.name + " , ")}</span></span></p>
                     <p><span className="genre">Genres : <span>{props.movieInfo.genres.map((genre) => genre.name + " , ")}</span></span></p>
                  </div>
               </div>
            </div>

         </div>
      </div>
   </div>
}

export default SideInfo;