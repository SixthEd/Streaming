import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Movies from "./Movies";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

function Browser() {

   return <div className="browser">
      <Navbar />


      <div className="top-screen">
         <div className="top-container">
            <video
               className="hero-video"
               src="https://www.w3schools.com/howto/rain.mp4"
               autoPlay
               loop
               muted
               playsInline
            />
            <div className="browser-button">
               <button className="play-arrow"><div><PlayArrowIcon sx={{ fontSize: 40 }} /></div><p>Play</p></button>
               <button className="info-out"><div><InfoOutlineIcon sx={{ fontSize: 40 }} /></div><p>More Info</p></button>
            </div>
            <div className="movies">
               <Movies />
            </div>
         </div>
      </div>



   </div>
}


export default Browser