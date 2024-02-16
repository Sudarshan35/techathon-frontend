"use client"
import CourseContent from "@/components/student/CourseContent";
import CourseDetails from "@/components/student/CourseDetails";
import VideoPlayer from "@/components/student/VideoPlayer";
import axios from "axios";
import { useEffect } from "react";

const Page=()=>{

    useEffect(()=>{
        
        const fetchCoursesData=async()=>{
            try{
                const res=await axios.get(`http://192.168.1.40:3030/courses/65ce07c364854af8b05f100e`);

                if(res){
                    console.log(res.data);
                }
            }
            catch(error){
                console.log(error);
            }
        }

        fetchCoursesData();

    },[]);

    return(
        <div className="w-full mt-6 flex justify-between  px-14">
            <div className="flex w-[950px] gap-8 flex-col">
                <VideoPlayer/>
                <CourseDetails/>
            </div>
            <CourseContent/> 
        </div>
    );
}

export default Page;