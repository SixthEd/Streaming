import React, { useContext, useCallback, useEffect, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { AuthContext } from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../utils";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function SideInfo(props) {

   const navigate = useNavigate();
   const { selectedMovie, setSelectedMovie, updateMyList } = useContext(AuthContext);

   const [similarMovies, setSimilarMovies] = useState(null);
   const [loadingSimilarTitles, setLoadingSimilarTitles] = useState(true)

   const streaming = useCallback(async (info) => {

      await axiosInstance.get("/movieTrailer", {
         params: {
            info
         }
      }).then((response) => { setSelectedMovie(response.data) }).catch((err) => { console.log(err) })

      navigate("/video")

   }, [])

   useEffect(() => {
      axiosInstance
         .get("/similarTitles", {
            params: { info: props.movieInfo.videoId }
         })
         .then((response) => {
            setSimilarMovies(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
      setLoadingSimilarTitles(false)
   }, [props.movieInfo.videoId]);

   return <div className="sideInformation">
      <div className="side-info-card">
         <div className="side-cardinfo">
            <div className="side-cardinfo-video">
               <div className="side-img-video"><img src={props.movieInfo.image} alt="" /><video poster={props.movieInfo.poster}></video></div>

               <div className="b"><CloseIcon sx={{ fontSize: 30 }} onClick={() => { props.sideInfo(); }} /></div>
               <div className="c">
                  <button className="play-arrow" onClick={() => { streaming(props.movieInfo.videoId) }}><div><PlayArrowIcon sx={{ fontSize: 50 }} /></div><p>Play</p></button>

                  {props.movieInfo.inlist || props.movieInfo.inlist === undefined && <div className="addbutton" onClick={() => { updateMyList({ profileId: JSON.parse(localStorage.getItem("selectedUser")).profile_id, id: props.movieInfo.id, logo: props.movieInfo.logo, year: props.movieInfo.year, title: props.movieInfo.title, maturityDescription: props.movieInfo.maturityDescription, specificRatingReason: props.movieInfo.specificRatingReason, tags: props.movieInfo.tags, poster: props.movieInfo.poster, image: props.movieInfo.image, videoId: props.movieInfo.videoId, cast: props.movieInfo.cast, genres: props.movieInfo.genres, rating: props.movieInfo.rating, context: props.movieInfo.context }) }}><AddCircleOutlineOutlinedIcon sx={{ fontSize: 50 }} /></div>}
               </div>
            </div>
            <div className="side-cardinfo-content">
               <div className="side-cardinfo-top">
                  <div className="left">
                     <p className="dob-time">{props.movieInfo.year}</p>
                     <p><span className="rating">{props.movieInfo.rating}</span><span> {props.movieInfo.tags.map((tag, i) => tag.name + (i < props.movieInfo.tags.length - 1 && " , "))}</span></p>
                     <p>{props.movieInfo.context}</p>
                  </div>
                  <div className="right">
                     <p><span className="cast">Cast : <span>{props.movieInfo.cast.slice(0, 4).map((c, i) => <span key={i}>{c.name + (i < props.movieInfo.cast.length - 1 && ", ")}</span>)}</span></span></p>
                     <p><span className="genre">Genres : <span>{props.movieInfo.genres.slice(0, 4).map((genre, i) => <span key={i}>{genre.name + (i < props.movieInfo.genres.length - 1 && " , ")} </span>)}</span></span></p>
                  </div>
               </div>
               <div className="side-cardinfo-bottom">
                  <div className="sidecardinfo-title">More Like This</div>
                  <div className="side-card-more">
                     <div className="side-moreCardContainer">
                        <div className="side-moreCard">
                           {!loadingSimilarTitles && similarMovies ? similarMovies.map((movie, i) => (<div className="sidecard-wrapper" key={i} onClick={() => { streaming(movie.id) }}>
                              <div className="side-card">
                                 <div className="sidecard-c">
                                    <div className="sidecard-img-video" ><div className="sidecard-img-videobutton"><PlayArrowIcon sx={{ fontSize: 50 }} /></div><video src="" poster={movie.details.itemSummary.boxArt.url} alt="" > </video></div>
                                    <div className="sidecard-content" >
                                       <div className="sidecard-subContent">
                                          <div className="sidecard-subrating">
                                             <span>{movie.details.maturity.rating.value}</span></div>

                                       </div>
                                       <div className="sidecard-context">
                                          <div className="side-rating">{movie.details.maturity.rating.specificRatingReason}</div>
                                          <div className="side-title">
                                             <span >Title : </span> {movie.details?.title}
                                          </div>
                                       </div>
                                       {movie?.details?.contextualSynopsis?.text}
                                    </div>

                                 </div>
                              </div>
                           </div>
                           )) :
                              (<div className="circular-progress">
                                 <Box sx={{ display: 'flex' }}>
                                    <CircularProgress color="white"/>
                                 </Box>
                              </div>)
                           }
                           <div>
                              <div className="about">About {props.movieInfo.title}</div>
                              <div className="side-card-moreinformation">

                                 <div><span>Cast : </span> {props.movieInfo.cast.map((c, i) => c.name + (i < props.movieInfo.cast.length - 1 && " , "))}</div>
                                 <div><span>Genres : </span>{props.movieInfo.genres.map((g, i) => g.name + (i < props.movieInfo.genres.length - 1 && " , "))}</div>
                                 <div><span>Maturity Rating : </span><span className="rating">{props.movieInfo.rating}</span><div>{props.movieInfo.specificRatingReason}</div><div>
                                    {props.movieInfo.maturityDescription}</div></div>

                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
   </div>
}

export default SideInfo;