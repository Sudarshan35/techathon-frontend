"use client"
import CourseContent from "@/components/student/CourseContent";
import CourseDetails from "@/components/student/CourseDetails";
import VideoPlayer from "@/components/student/VideoPlayer";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../../config";

const Page=({params}:{params:any})=>{

    const [loading,setLoading]=useState(true);
    const [data,setData]=useState<any>([]);
    const [selectedModule,setSelectedModule]=useState<any>([]);
    const [selectedModuleIndex,setSelectedModuleIndex]=useState(0);

    useEffect(()=>{
        
        const fetchCoursesData=async()=>{
            setLoading(true);
            try{
                const res=await axios.get(`${BASE_URL}/courses/${params?.courseId}`);

                if(res){
                    setData(res.data?.data)
                    setSelectedModule(res.data?.data?.modules[0]);
                    setSelectedModuleIndex(1);
                    setLoading(false);
                }
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }
        }

        fetchCoursesData();

    },[]);

    console.log(data);
    console.log(selectedModule);

    if(loading){
        return(
            <div className="flex flex-col justify-center items-center w-full h-[80vh]">
                <div className="text-center">
                    <p className="text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    return(
        <div className="w-full mt-6 flex justify-between  px-14">
            <div className="flex w-[950px] gap-8 flex-col">
                <VideoPlayer selectedModule={selectedModule} selectedModuleIndex={selectedModuleIndex}/>
                <CourseDetails data={data}/>
            </div>
            <CourseContent data={data} selectedModule={selectedModule} setSelectedModule={setSelectedModule} setSelectedModuleIndex={setSelectedModuleIndex}/> 
        </div>
    );
}

export default Page;