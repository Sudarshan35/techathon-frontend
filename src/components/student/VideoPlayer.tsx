"use client"
import ReactPlayer from "react-player";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import replay30 from "../../../assets/images/30replay.png";
import Image from "next/image";
import { IoVolumeMediumSharp } from "react-icons/io5";
import { RiFullscreenFill } from "react-icons/ri";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { RiFullscreenExitFill } from "react-icons/ri";
import screenfull from "screenfull";

const VideoPlayer=()=>{

    const [playVideo,setPlayVideo]=useState<boolean>(false);
    const [qualityPopUp,setQualityPopUp]=useState<boolean>(false);
    const [currentQuality,setCurrentQuality]=useState<string>('720p');
    const [isMute,setIsMute]=useState<boolean>(false);
    const [playbackRate,setPlaybackRate]=useState<number>(1.0);
    const [playbackPopUp,setPlaybackPopUp]=useState<boolean>(false);
    const [isFullScreen,setIsFullScreen]=useState<boolean>(false);
    const [progressBar,setProgressBar]=useState<number>(0);

    const playerContainerRef=useRef<HTMLElement>(null);
    const videoPlayerRef=useRef<ReactPlayer>(null);
    const playbackPopUpRef=useRef<HTMLElement>(null)
    const qualityPopUpRef=useRef<HTMLElement>(null);

    useEffect(()=>{

        const handleKeyDown=(e:KeyboardEvent)=>{

            if(e.code==='Space'){
                 setPlayVideo(prevPlayVideo=>!prevPlayVideo);
            };

        }

        const handleClickOutside=(e:MouseEvent)=>{

            if(qualityPopUpRef.current && !qualityPopUpRef.current.contains(e.target as Node) && !(e.target as HTMLElement).closest(".quality-container")){
                setQualityPopUp(false);
            };

            if(playbackPopUpRef.current && !playbackPopUpRef.current.contains(e.target as Node) && !(e.target as HTMLElement).closest(".playback-container")){
                setPlaybackPopUp(false);
            };
        }

        const handleVideoProgress=()=>{

            const currentTime=videoPlayerRef.current?.getCurrentTime();
            const duration=videoPlayerRef.current?.getDuration();
    
            if(currentTime && duration){
                setProgressBar((currentTime/duration)*100);
            }

        }

        const progressInterval = setInterval(handleVideoProgress, 1000);

        document.addEventListener("keydown",handleKeyDown);
        document.addEventListener("mousedown",handleClickOutside);

        return () => {
            clearInterval(progressInterval);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown",handleClickOutside);
        };

    },[]);

    const toggleFullScreen=()=>{
        if (playerContainerRef.current) {
            setIsFullScreen(!isFullScreen);
            screenfull.toggle(playerContainerRef.current);
        } else {
            console.error("Player container ref is null.");
        }
    }

    const handleProgressBarChange=(value:number)=>{
        const newPosition=(value/100)*(videoPlayerRef.current?.getDuration() ?? 0);
        videoPlayerRef.current?.seekTo(newPosition);
        setProgressBar(value);
    }

    const formatDuration = (durationInSeconds:number|undefined) => {
        if(!durationInSeconds){
            return '00:00';
        }
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);
    
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }; 

    console.log(progressBar);
 
    return(
        <div ref={playerContainerRef as React.RefObject<HTMLDivElement>} className="w-full h-[535px] relative flex justify-center overflow-hidden rounded-md shadow-md border-2 border-blue-600 shadow-blue-600  ">
            <ReactPlayer ref={videoPlayerRef} playbackRate={playbackRate} height="100%" width="100%" muted={isMute} playing={playVideo} url={'https://res.cloudinary.com/dkaqcqy2j/video/upload/v1707844712/edtech/hzw7ievzmcv5cvwjc8ws.mp4'}/>
            <div className={`absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-60 z-10 ${!playVideo ? "opacity-100" : "opacity-0"}  transition-opacity duration-700 hover:opacity-100`}>
                <h1 className="text-2xl mt-0 ml-4 ">Ep-01 | What will you get in this course</h1>
                <div className="flex justify-center gap-10">
                    {!playVideo &&
                    <div onClick={()=>setPlayVideo(!playVideo)} className="bg-white flex justify-center items-center hover:bg-richblack-50 transition-all duration-300 p-[23px] rounded-full cursor-pointer">
                        <FaPlay className="text-black text-2xl "/>
                    </div>}
                    {playVideo &&
                    <div onClick={()=>setPlayVideo(!playVideo)} className="bg-white flex justify-center items-center hover:bg-richblack-50 transition-all duration-300 p-5 rounded-full cursor-pointer">
                        <FaPause className="text-black text-3xl "/>
                    </div>}
                </div> 
                <div className="flex flex-col gap-4 w-full">
                    <input value={progressBar} onChange={(e)=>handleProgressBarChange(Number(e.target.value))} min={0} max={100} type="range" className="w-full h-1 cursor-pointer "/>
                    <div className="mb-1 justify-between items-center flex">
                        <div className="ml-4 flex gap-4 items-center">
                            <div className="w-5">
                                {!playVideo && <FaPlay onClick={()=>setPlayVideo(!playVideo)} className="cursor-pointer hover:text-richblack-50 transition-all duration-300 text-lg"/>}
                                {playVideo && <FaPause onClick={()=>setPlayVideo(!playVideo)} className="pr-1 cursor-pointer hover:text-richblack-50 transition-all duration-300 text-2xl"/>}
                            </div>
                            <Image onClick={()=>videoPlayerRef.current?.seekTo(videoPlayerRef.current.getCurrentTime()-30)} className="w-6 cursor-pointer" src={replay30} alt="forward-30"/>
                            <div onClick={()=>setPlaybackPopUp(!playbackPopUp)} className="playback-container font-semibold cursor-pointer rounded w-14 py-0.5 text-center text-black  hover:bg-richblack-50 transition-all duration-300 bg-white">{playbackRate}x</div>
                            <Image onClick={()=>videoPlayerRef.current?.seekTo(videoPlayerRef.current.getCurrentTime()+30)} className="w-6 cursor-pointer scale-x-[-1]" src={replay30} alt="forward-30"/>
                            <div className="font-medium pl-1">{formatDuration(videoPlayerRef.current?.getCurrentTime())} / {formatDuration(videoPlayerRef.current?.getDuration())}</div>
                        </div>
                        <div className="flex gap-4 mr-4 items-center">
                            {!isMute && <IoVolumeMediumSharp onClick={()=>setIsMute(!isMute)} className="cursor-pointer hover:text-richblack-50 transition-all duration-300 text-[28px]"/>}
                            {isMute && <IoVolumeMuteSharp onClick={()=>setIsMute(!isMute)} className="cursor-pointer hover:text-richblack-50 transition-all duration-300 text-[28px]"/>}                            
                            <div className="py-1 px-1.5 rounded cursor-pointer hover:bg-richblack-50 transition-all duration-300 bg-white text-black text-xs font-bold">CC</div>
                            <div onClick={()=>setQualityPopUp(!qualityPopUp)} className="quality-container font-medium w-12 cursor-pointer text-center hover:text-richblack-50 transition-all duration-300">{currentQuality}</div>
                            {!isFullScreen && <RiFullscreenFill onClick={toggleFullScreen} className="cursor-pointer hover:text-richblack-50 transition-all duration-300 text-[24px]"/>}
                            {isFullScreen && <RiFullscreenExitFill onClick={toggleFullScreen} className="cursor-pointer hover:text-richblack-50 transition-all duration-300 text-[24px]"/>}
                        </div>
                        {qualityPopUp &&
                        <div ref={qualityPopUpRef as React.RefObject<HTMLDivElement>} className="absolute py-2 right-12 bottom-[90px] rounded bg-richblack-900 bg-opacity-70">
                            <ul className="text-sm w-24 px-3 text-center flex flex-col gap-2">
                                <li onClick={()=>setCurrentQuality('1080p')} className={`cursor-pointer ${currentQuality=='1080p' ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700 "} rounded py-1 w-full`}>1080p</li>
                                <li onClick={()=>setCurrentQuality('720p')}  className={`cursor-pointer ${currentQuality=='720p' ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700 "} rounded py-1 w-full`}>720p</li>
                                <li onClick={()=>setCurrentQuality('480p')}  className={`cursor-pointer ${currentQuality=='480p' ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700 "} rounded py-1 w-full`}>480p</li>
                                <li onClick={()=>setCurrentQuality('Auto')}  className={`cursor-pointer ${currentQuality=='Auto' ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700 "} rounded py-1 w-full`}>Auto</li>
                            </ul>
                        </div>   
                        }
                        {playbackPopUp &&
                        <div ref={playbackPopUpRef as React.RefObject<HTMLDivElement>} className="absolute py-2 left-24 bottom-[90px] rounded bg-richblack-900 bg-opacity-70">
                            <ul className="text-sm w-24 px-3 text-center flex flex-col gap-2">
                                <li onClick={()=>setPlaybackRate(1.0)} className={`cursor-pointer ${playbackRate==1.0 ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700"} rounded py-0.5 w-full`}>1x</li>
                                <li onClick={()=>setPlaybackRate(1.25)} className={`cursor-pointer ${playbackRate==1.25 ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700"} rounded py-0.5 w-full`}>1.25x</li>
                                <li onClick={()=>setPlaybackRate(1.5)} className={`cursor-pointer ${playbackRate==1.5 ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700"} rounded py-0.5 w-full`}>1.5x</li>
                                <li onClick={()=>setPlaybackRate(1.75)} className={`cursor-pointer ${playbackRate==1.75 ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700"} rounded py-0.5 w-full`}>1.75x</li>
                                <li onClick={()=>setPlaybackRate(2.0)} className={`cursor-pointer ${playbackRate==2.0 ? "bg-richblack-500 hover:bg-richblack-500" : "hover:bg-richblack-700"} rounded py-0.5 w-full`}>2x</li>
                            </ul>
                        </div>   
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;