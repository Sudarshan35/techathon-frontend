"use client"
import { useState } from "react";

const CourseDetails=({data}:{data:any})=>{

    const [activeSection,setActiveSection]=useState<string>('1');

    return(
        <div className="w-full px-4 py-2 pb-8 mb-10 rounded-md relative bg-richblack-800">
            <ul className="pb-1.5 item-center flex gap-6 text-lg">
                <li onClick={()=>setActiveSection('1')} className={`border-b-2 pb-[3px] ${activeSection==='1' ? "border-yellow-200 " : " border-transparent hover:border-yellow-600 "}  cursor-pointer transition-all duration-300  px-2`}>Overview</li>
                <li onClick={()=>setActiveSection('2')} className={`border-b-2 ${activeSection==='2' ? "border-yellow-200" : " border-transparent hover:border-yellow-600 "}  cursor-pointer  transition-all duration-300  px-2`}>Timestamps</li>
                <li onClick={()=>setActiveSection('3')} className={`border-b-2 ${activeSection==='3' ? "border-yellow-200" : " border-transparent hover:border-yellow-600 "}  cursor-pointer  transition-all duration-300 px-2`}>Live Notes</li>
                <li onClick={()=>setActiveSection('4')} className={`border-b-2  ${activeSection==='4' ? "border-yellow-200" : " border-transparent hover:border-yellow-600"}  cursor-pointer  transition-all duration-300  px-2`}>Summarize video [AI]</li>
                <li onClick={()=>setActiveSection('5')} className={`border-b-2 ${activeSection==='5' ? "border-yellow-200" : " border-transparent hover:border-yellow-600"}  cursor-pointer   transition-all duration-300  px-2`}>Translate</li>
            </ul>
            <hr className="absolute border-richblack-500 top-11 w-[98%] left-1/2 transform -translate-x-1/2 "></hr>
            {activeSection=="1" && 
                <div className="flex pt-7 flex-col gap-5 pl-3 pr-10">
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-[16.5px]">About this course</p>
                        <div className="text-richblack-300">
                            Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <p className="font-medium text-[16.5px]">Description</p>
                        <div className="text-richblack-300">{data?.description}</div>
                    </div>
                </div>
            }
            {activeSection=="2" && 
                <div>
                    2
                </div>
            }
            {activeSection=="3" && 
                <div>
                    3
                </div>
            }
            {activeSection=="4" && 
                <div>
                    4
                </div>
            }
            {activeSection=="5" && 
                <div>
                    5
                </div>
            }
        </div>
    );
}

export default CourseDetails;