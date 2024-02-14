"use client"
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoIosCheckbox } from "react-icons/io";
import { RiFolderVideoLine } from "react-icons/ri";

const CourseContent=()=>{

    const array1=[1,2,3,4,5,6];
    const array2=[1,2,3,4,5,6,7,8];

    const [isSectionOpen,setIsSectionOpen]=useState<boolean>(false);
    const [selectedSectionIndex,setSelectedSectionIndex]=useState<number|null>(null);
    const [selectedLecture,setSelectedLecture]=useState<number|null>(null)

    const handleSectionClick=(index:number)=>{
        if(selectedSectionIndex==index){
            setIsSectionOpen(false);
            setSelectedSectionIndex(null);
        }
        else{
            setIsSectionOpen(true);
            setSelectedSectionIndex(index);   
        }
    }

    return(
        <div className="w-[420px] relative flex mb-10 flex-col h-fit pt-3 rounded-md bg-richblack-800">
            <div className="px-5 mb-6">
                <h1 className="text-lg font-medium">Course Content</h1>
                <hr className="absolute border border-yellow-200 mt-2 left-1/2 transform -translate-x-1/2 w-[95%]"></hr>
            </div>
            {array1.map((index,item)=>{
                return(
                    <div key={index} className="mb-2">
                        <div onClick={()=>handleSectionClick(index)} className={`cursor-pointer relative rounded-md px-4 py-4 pb-5 mx-2 transition-all duration-300 ${isSectionOpen && selectedSectionIndex==index ? "hover:bg-richblack-500 bg-richblack-500" : "hover:bg-richblack-700"}`}>
                            <div className="flex items-center w-full justify-between ">
                                <p>Section 1 : Front-End Web Development</p>
                                <FaChevronDown className={`absolute ${isSectionOpen && selectedSectionIndex==index ? "rotate-180" : ""} transition-all duration-300 right-3 top-8`}/>
                            </div>
                            <div className="text-sm mt-0.5">9/9 | 37 min</div>
                        </div>
                        {isSectionOpen && selectedSectionIndex===index &&
                        <div className={`mt-3 px-3 ${isSectionOpen && selectedSectionIndex===index ? "opacity-100 " : "opacity-0"} transition-all duration-300`}> 
                            {array2.map((i,item)=>{
                                return(
                                    <div key={i} onClick={()=>setSelectedLecture(i)} className={`flex pl-5 cursor-pointer transition-all duration-300 ${selectedLecture==i && isSectionOpen && selectedSectionIndex===index ? "hover:bg-richblack-500 bg-richblack-500" : "hover:bg-richblack-700"} rounded-md py-2.5 my-2 items-center gap-4`}>
                                        {/* <IoIosCheckboxOutline className="text-2xl"/> */}
                                        <IoIosCheckbox className="text-2xl"/>
                                        <div className="flex flex-col gap-0.5">
                                            <p className="font-light">1. What you will get in this course</p>
                                            <div className={`flex gap-2 ${selectedLecture==i && isSectionOpen ? "text-richblack-100" : "text-richblack-400"} transition-all duration-300 items-center`}>
                                                <RiFolderVideoLine className="text-lg"/>
                                                <p className="text-sm">3 min</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default CourseContent;