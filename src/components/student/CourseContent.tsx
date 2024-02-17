"use client"
import { useState } from "react";
import { RiFolderVideoLine } from "react-icons/ri";

const CourseContent=({data,selectedModule,setSelectedModule,setSelectedModuleIndex}:{data:any,selectedModule:any,setSelectedModule:any,setSelectedModuleIndex:any})=>{

    const handleSectionClick=(module:any,index:any)=>{

        if(selectedModule._id!==module._id){
            setSelectedModule(module)
            setSelectedModuleIndex(index+1);
        }
        else{
            return;   
        }

    };

    return(
        <div className="w-[420px] relative flex mb-10 flex-col h-fit pt-3 rounded-md bg-richblack-800">
            <div className="px-5 mb-6">
                <h1 className="text-lg font-medium">Course Content</h1>
                <hr className="absolute border border-yellow-200 mt-2 left-1/2 transform -translate-x-1/2 w-[95%]"></hr>
            </div>
            {data?.modules.map((module,index)=>{
                return(
                    <div key={module._id} className="mb-2">
                        <div onClick={()=>handleSectionClick(module,index)} className={`cursor-pointer relative rounded-md px-4 py-4 pb-5 mx-2 transition-all duration-300 ${selectedModule._id==module._id ? "hover:bg-richblack-500 bg-richblack-500" : "hover:bg-richblack-700"}`}>
                            <div className="flex items-center w-full justify-between ">
                                <p>Lecture {index+1} : {module.title}</p>
                                {/* <FaChevronDown className={`absolute ${isSectionOpen && selectedSectionIndex==index ? "rotate-180" : ""} transition-all duration-300 right-3 top-8`}/> */}
                            </div>
                            <div className={`flex gap-2 ${selectedModule._id==module._id ? "text-richblack-100" : "text-richblack-400"} items-center`}>
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