import React, { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Movies from "./Movies";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import axiosInstance from "../utils";
import SideInfo from "./SideInfo";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Browser() {

   const { setSelectedMovie, selectedMovie } = useContext(AuthContext)
   const [toggleSideinfo, setToggleSideInfo] = useState(false);
   const [sideSelectedMovie, setSideSelectedMovie] = useState(null);
   const [movieList, setMovieList] = React.useState(null);
   // const [randomMovie, setRandomMovie] = React.useState(null);
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

   useEffect(() => {
      axiosInstance.get("/movielist", {
      }).then((response) => {
         console.log(response.data); setMovieList(response.data)
      }).catch((err) => {
         console.log(err)
      })
   }, [])


   // useEffect(() => {
   //    if (movieList) {
   //       let randomMovieList = Math.floor(Math.random() * movieList.length);
   //       let randomTitle = Math.floor(Math.random() * movieList[randomMovieList].data.titles.length)
   //       if (randomTitle) {
   //          setRandomMovie(movieList[randomMovieList].data.titles[randomTitle])

   //       }
   //    }
   // })


   const streaming = useCallback(async (info) => {
      console.log(info)
      await axiosInstance.get("/movieTrailer", {
         params: {
            info
         }
      }).then((response) => { setSelectedMovie(response.data) }).catch((err) => { console.log(err) })

      navigate("/video")

   }, [])

   return <div className="browser">
      {toggleSideinfo && <SideInfo sideInfo={updateToggleSideInfo} movieInfo={sideSelectedMovie} />}

      <Navbar />


      <div className="top-screen">
         <div className="top-container">
            <div className="video-browser-button">
               <div className="top-screen-img-video">
                  <img src={movieList?.randomMovie.logoImage?.url} alt="" />
                  <video
                     className="hero-video"
                     // src="https://www.w3schools.com/howto/rain.mp4"
                     autoPlay
                     loop
                     muted
                     playsInline
                     poster={movieList?.randomMovie.backgroundImage?.url}
                  />
               </div>
               <div className="browser-button">
                  <button className="play-arrow" onClick={() => { streaming(movieList?.randomMovie.id) }}><div><PlayArrowIcon sx={{ fontSize: 40 }} /></div><p>Play</p></button>
                  <button className="info-out"
                     onClick={() => {
                        updateToggleSideInfo(
                           {
                              id: movieList.randomMovie.id, logo: movieList.randomMovie.logoImage.url, year: movieList.randomMovie.releaseYear, title: movieList.randomMovie.title, maturityDescription: movieList.randomMovie.maturity.rating.maturityDescription, specificRatingReason: movieList.randomMovie.maturity.rating.specificRatingReason, tags: movieList.randomMovie.tags, poster: movieList.randomMovie.backgroundImage.url, image: movieList.randomMovie.logoImage.url, videoId: movieList.randomMovie.trackIds.videoId, cast: movieList.randomMovie.cast, genres: movieList.randomMovie.genres, rating: movieList.randomMovie.maturity.rating.value, context: movieList.randomMovie.contextualSynopsis.text

                           }
                        )
                     }}><div><InfoOutlineIcon sx={{ fontSize: 40 }} /></div><p>More Info</p></button>

               </div>
            </div>
            <div className="movies-informations">
               <div className="movies">
                  {movieList?.combinedResults?.map((moviels, i) => <Movies key={i} sideInfo={updateToggleSideInfo} movies={moviels} />)}
               </div>

            </div>
         </div>
      </div>



   </div>
}


export default Browser