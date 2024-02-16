"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BASE_URL, userDetails } from "../../../../config";
import Cookies from "js-cookie";

const Page=()=>{

    const router=useRouter();

    const user=userDetails;

    useEffect(()=>{
        
        const fetchCoursesData=async()=>{
            try{
                const token = Cookies.get('token');
                console.log(token);
                const res=await axios.get(`${BASE_URL}/myCourses`,{
                    headers:{'Authorization':`Bearer ${token}`}
                });

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

    if(!user){
        router.push("/login");
        return <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex justify-center items-center h-screen w-full text-xl font-medium'>Loading...</div>
        </div>    
    }

    return(
        <div>
            <div className="flex  flex-col justify-center items-center w-full h-[90vh]">
                <div className="text-center">
                    <p className="text-xl">No courses Added yet</p>
                    <button onClick={()=>router.push("/tutor/uploadCourse")} className="py-1.5 w-[8rem] bg-yellow-50 mt-4 text-black font-bold rounded-md">Create Courses</button>
                </div>
            </div>
        </div>
    );
}

export default Page;

