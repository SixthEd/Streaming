import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Replay10SharpIcon from '@mui/icons-material/Replay10Sharp';
import Forward10SharpIcon from '@mui/icons-material/Forward10Sharp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


function Video(props) {

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const controllerRef = useRef(null);

    const { selectedMovie, setSelectedMovie } = useContext(AuthContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMute, setIsMute] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [showControllers, setShowControllers] = useState(false);

    const handleMouseMovement = () => {
        setShowControllers(true);
        clearTimeout(controllerRef.current);
        controllerRef.current = setTimeout(() => {
            setShowControllers(false);
        }, 3000)
    }

    useEffect(() => {
        const video = videoRef.current;
        console.log(video)
        if (!video) return;
        video.addEventListener("mousemove", handleMouseMovement);

        return () => {
            video.removeEventListener("mousemove", handleMouseMovement);
            clearTimeout(controllerRef.current);
        }

    }, [])


    const navigate = useNavigate();

    const togglePlayPause = useCallback(() => {
        if (videoRef.current) {
            console.log(videoRef.current)
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            }
            else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, []);

    const navigateTo = useCallback(() => {
        setSelectedMovie(null);
        navigate("/browser")
    }, [])

    const handleProgress = useCallback((event) => {
        const currentTime = (event.target.value / 100) * videoRef.current.duration;
        // setProgress(event.target.value);
        videoRef.current.currentTime = currentTime;
        // setRemainingTime(formatTime(videoRef.current.duration - currentTime))
    }, [])


    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const min = Math.floor((timeInSeconds % 3600) / 60);
        const sec = Math.floor(timeInSeconds % 60);

        const hoursFormat = hours > 0 ? `${hours}` : '';
        const minFormat = min < 10 && min > 0 ? `0${min}` : min;
        const secFormat = sec < 10 ? `0${sec}` : sec;

        return `${hoursFormat}${minFormat}:${secFormat}`;
    };


    const reversehandleProgress = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        const newCurrentTime = Math.min(video.currentTime - 10, video.duration);
        video.currentTime = newCurrentTime;
        const newProgress = (newCurrentTime / video.duration) * 100
        setProgress(newProgress)
    }, [progress])

    const forwardhandleProgress = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        const newCurrentTime = Math.min(video.currentTime + 10, video.duration);
        video.currentTime = newCurrentTime;
        const newProgress = (newCurrentTime / video.duration) * 100
        setProgress(newProgress)
    }, [progress])


    const handleVolume = useCallback((event) => {
        videoRef.current.volume = event.target.value;
        setVolume(event.target.value);
        if (videoRef.current.volume === 0) {
            setIsMute(true)
        }
        else {
            setIsMute(false)
        }
    })

    const toggleMute = useCallback(() => {

        setIsMute((old) => !old);
        if (!isMute) {
            videoRef.current.volume = 0;
        }
        else {
            videoRef.current.volume = volume;
        }

    }, [isMute, volume])

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            const current = video.currentTime;
            const duration = video.duration || 1; // avoid division by 0
            const progressPercent = (current / duration) * 100;
            setProgress(progressPercent);
            setRemainingTime(formatTime(duration - current))
        };

        video.addEventListener('timeupdate', updateProgress);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
        };
    }, []);



    return <div className="streaming" ref={containerRef}>
        {selectedMovie?.videoData?.[1]?.videoUrl ? (<div>
            <div className={showControllers ? "streaming-back" : ""} onClick={() => { navigateTo() }} >
                <div><ArrowBackSharpIcon sx={{ fontSize: 60, fill: "white" }} /></div>
            </div>


            <video
                src={selectedMovie.videoData[1].videoUrl}
                ref={videoRef}
                poster={selectedMovie.videoData[1].thumbnailUrl}
                autoPlay
                controls={false}
            />


            <div className={showControllers ? "controllers" : ""}>
                <div className="video-progress">
                    <input

                        type='range'
                        min='0'
                        max='100'
                        value={progress}
                        onChange={handleProgress}
                    />
                    <div>{remainingTime}</div>
                </div>
                <div className="video-controlls">
                    <div className="controller-buttons">
                        <div className="controller-play">
                            <PlayArrowIcon sx={{ fontSize: 60, fill: "white" }} onClick={() => { togglePlayPause() }} />
                        </div>
                        <div className="controller-reverse">
                            <Replay10SharpIcon sx={{ fontSize: 60, fill: "white" }} onClick={() => { reversehandleProgress() }} />
                        </div>
                        <div className="controller-forward">
                            <Forward10SharpIcon sx={{ fontSize: 60, fill: "white" }} onClick={() => { forwardhandleProgress() }} />
                        </div>
                        <div className="volume-full-controller">
                            <div className="controller-volume">{isMute ? <VolumeOffIcon sx={{ fontSize: 60, fill: "white" }} onClick={() => { toggleMute() }} /> : <VolumeUpIcon sx={{ fontSize: 60, fill: "white" }} onClick={() => { toggleMute() }} />}</div>
                            <div className="volume-range">
                                <input type="range" min='0' max='1' step="0.05" value={volume} onChange={handleVolume}></input>
                            </div>
                        </div>
                    </div>
                    <div>
                        {selectedMovie?.title && (<p>{selectedMovie.title}</p>)}</div>
                    <div>
                        {!isFullScreen ? <FullscreenIcon sx={{ fontSize: 60, fill: "white" }} onClick={() => { if (containerRef.current.requestFullscreen) { containerRef.current.requestFullscreen(); setIsFullScreen(true) } }} /> : <FullscreenExitIcon sx={{ fontSize: 60, fill: "white" }} onClick={() => { if (document.fullscreenElement) { document.exitFullscreen(); setIsFullScreen(false) } }} />}
                    </div>
                </div>
            </div>
        </div>) :
            <div className="not-found">
                <ErrorOutlineIcon sx={{fontSize:"150px"}}/><p>Video not Found</p>
            </div>}
    </div>
}

export default Video;