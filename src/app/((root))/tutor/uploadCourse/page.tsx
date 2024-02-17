"use client"
import UploadCourseVideos from "@/components/tutor/uploadCourseVideos/UploadCourseVideos";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { BASE_URL, userDetails } from "../../../../../config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Page=()=>{

    const router=useRouter();

    const user=userDetails;

    const [uploadState,setUploadState]=useState<number>(1);
    const [noOfVideo,setNoOfVideo]=useState<number>(0);
    const [data,setData]=useState<any>([]);
    
    const initialValues={
        tutor_name:user?.name,
        description:"",
        category:"",
        domain:"",
        course_name:"",
        image_url:"",
        email_id:"",
        date:"",
    }

    const {values,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        onSubmit:async(values,action)=>{
            try{
                console.log(values);
                const token = Cookies.get('token');
                console.log(token);

                const res = await axios.post(`${BASE_URL}/courses`,values);
                
                if(res){
                    console.log(res.data);
                    setUploadState(2);
                    setData(res.data.data);
                    setNoOfVideo(noOfVideo+1);
                    return;
                }

                console.log('error');
            }
            catch(error){
                console.log(error);
            };
        }
    });

    // console.log(user);

    if(!user){
        router.push("/login");
        return (<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex justify-center items-center h-screen w-full text-xl font-medium'>Loading...</div>
                </div>
                );  
    }  

    return(
        <div className="flex justify-center min-h-[80vh] my-10 w-full items-center flex-col">
            <div className="flex bg-richblack-700 rounded-xl px-10 py-6 ">
            {uploadState==1 &&
            <form onSubmit={handleSubmit}>
                <div className=" flex flex-col  gap-5 ">
                    <h1 className="text-lg font-medium  text-yellow-200 m-auto">Add Course details</h1>
                    <div className="flex items-center gap-5"> 
                        <div className="flex gap-1 w-96 flex-col">
                            <label>Course name</label>
                            <input style={{"boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"}} name="course_name" className="text-richblack-5 bg-opacity-80 bg-richblack-800 px-2 py-2 rounded-lg" value={values.course_name} onChange={handleChange} onBlur={handleBlur} placeholder="Course name" required />
                        </div>
                        <div className="flex flex-col gap-1 w-96">
                            <label>category</label>
                            <input style={{"boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"}} name="category" className="text-richblack-5 bg-opacity-80 bg-richblack-800 px-2 py-2 rounded-lg"  value={values.category} onChange={handleChange} onBlur={handleBlur} placeholder="Add category" required></input>
                        </div>
                    </div> 
                    <div className="flex items-center gap-5"> 
                        <div className="flex flex-col gap-1 w-96">
                            <label>Date created</label>
                            <input style={{"boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"}} name="date" type="date" className="text-richblack-5 bg-opacity-80 bg-richblack-800 px-2 py-2 rounded-lg"  value={values.date} onChange={handleChange} onBlur={handleBlur} placeholder="Add date" required></input>
                        </div>  
                        <div className="flex flex-col gap-1 w-96">
                            <label>Domain</label>
                            <input style={{"boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"}} value={values.domain} className="text-richblack-5 bg-opacity-80 bg-richblack-800 px-2 py-2 rounded-lg"  name="domain" onChange={handleChange} onBlur={handleBlur} placeholder="Add domain" required></input>
                        </div> 
                    </div> 
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col gap-1 w-96">
                            <label>Image url</label>
                            <input style={{"boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"}} value={values.image_url} className="text-richblack-5 bg-opacity-80 bg-richblack-800 px-2 py-2 rounded-lg"   name="image_url" onChange={handleChange} onBlur={handleBlur} placeholder="Add image url" required></input>
                        </div> 
                        <div className="flex flex-col gap-1 w-96">
                            <label>Email ID</label>
                            <input style={{"boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"}} value={values.email_id} className="text-richblack-5 bg-opacity-80 bg-richblack-800 px-2 py-2 rounded-lg"   name="email_id" onChange={handleChange} onBlur={handleBlur} placeholder="Add email" required></input>
                        </div>
                    </div>   
                    <div className="flex flex-col">
                        <label>Description</label>
                        <textarea style={{"boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"}} name="description" className="text-richblack-5 bg-richblack-800 bg-opacity-80 rounded-lg px-2 pr-2 py-2 h-36" value={values.description} onChange={handleChange} onBlur={handleBlur} placeholder="Add description" required></textarea>
                    </div> 
                    <button className=" px-3 py-2 m-auto mt-2 bg-yellow-100 font-[700] rounded-md text-black w-72 transition-all duration-300  hover:bg-yellow-200">Create course</button>               
                </div>
            </form>
            }
            {uploadState==2 && 
                <UploadCourseVideos setNoOfVideo={setNoOfVideo} noOfVideo={noOfVideo} data={data}/>
            }
            </div>
        </div>
    );
}

export default Page;