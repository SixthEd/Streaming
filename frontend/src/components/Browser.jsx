import React, { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Movies from "./Movies";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

import SideInfo from "./SideInfo";
import { AuthContext } from "./AuthContext";

function Browser() {

   const {movieList, setSelectedMovie, selectedMovie} =useContext(AuthContext)
   const [toggleSideinfo, setToggleSideInfo] = useState(false);
   const [sideSelectedMovie, setSideSelectedMovie] = useState(null);

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


   return <div className="browser">
      {toggleSideinfo && <SideInfo sideInfo={updateToggleSideInfo} movieInfo={sideSelectedMovie}/>}

      <Navbar />


      <div className="top-screen">
         <div className="top-container">
            <div className="video-browser-button">
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
            </div>
            <div className="movies-informations">
               <div className="movies">
                  {movieList?.map((moviels)=><Movies sideInfo={updateToggleSideInfo} movies={moviels}/>)}
                  {/* <Movies sideInfo={updateToggleSideInfo} movies={movieList}/>
                  
                  <Movies sideInfo={updateToggleSideInfo} />
                  <Movies sideInfo={updateToggleSideInfo} />
                  <Movies sideInfo={updateToggleSideInfo} />
                  <Movies sideInfo={updateToggleSideInfo} />
                  <Movies sideInfo={updateToggleSideInfo} /> */}
               </div>

            </div>
         </div>
      </div>



   </div>
}


export default Browser