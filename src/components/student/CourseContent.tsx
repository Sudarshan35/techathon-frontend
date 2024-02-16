"use client"
import { useState } from "react";
import { RiFolderVideoLine } from "react-icons/ri";

const CourseContent=()=>{

    const array1=[1,2,3,4,5,6];

    const [selectedLectureIndex,setSelectedLectureIndex]=useState<number|null>(null);

    const handleSectionClick=(index:number)=>{

        if(selectedLectureIndex==index){
            return;
        }
        else{
            setSelectedLectureIndex(index);   
        }

    };

    return(
        <div className="w-[420px] relative flex mb-10 flex-col h-fit pt-3 rounded-md bg-richblack-800">
            <div className="px-5 mb-6">
                <h1 className="text-lg font-medium">Course Content</h1>
                <hr className="absolute border border-yellow-200 mt-2 left-1/2 transform -translate-x-1/2 w-[95%]"></hr>
            </div>
            {array1.map((index,item)=>{
                return(
                    <div key={index} className="mb-2">
                        <div onClick={()=>handleSectionClick(index)} className={`cursor-pointer relative rounded-md px-4 py-4 pb-5 mx-2 transition-all duration-300 ${selectedLectureIndex==index ? "hover:bg-richblack-500 bg-richblack-500" : "hover:bg-richblack-700"}`}>
                            <div className="flex items-center w-full justify-between ">
                                <p>Lecture 01 : Front-End Web Development</p>
                                {/* <FaChevronDown className={`absolute ${isSectionOpen && selectedSectionIndex==index ? "rotate-180" : ""} transition-all duration-300 right-3 top-8`}/> */}
                            </div>
                            <div className={`flex gap-2 ${selectedLectureIndex==index ? "text-richblack-100" : "text-richblack-400"} items-center`}>
                                <RiFolderVideoLine className="text-lg"/>
                                <p className="text-sm">3 min</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CourseContent;