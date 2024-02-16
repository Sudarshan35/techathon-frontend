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
    const [noOfVideos,setNoOfVideos]=useState<number>(0);
    const [data,setData]=useState<any>([]);
    
    const initialValues={
        tutor_name:"Suyash Deshpande",
        description:"",
        category:"",
        domain:"",
        course_name:"",
        image_url:"",
        email_id:"",
    }

    const {values,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        onSubmit:async(values,action)=>{
            try{
                console.log(values);
                const token = Cookies.get('token');
                console.log(token);

                const res=await axios.post(`${BASE_URL}/uploadCourse`,{
                    data:values,
                    headers:{'Authorization':`Bearer ${token}`}
                });
                
                if(res){
                    console.log(res.data);
                    setUploadState(2);
                    setData(res.data.data);
                    setNoOfVideos(noOfVideos+1);
                    return;
                }

                console.log('error');
            }
            catch(error){
                console.log(error);
            };
        }
    });

    console.log(user);

    if(!user){
        router.push("/login");
        return (<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex justify-center items-center h-screen w-full text-xl font-medium'>Loading...</div>
                </div>);  
    }  

    return(
        <div>
            {uploadState==1 &&
            <form onSubmit={handleSubmit}>
                <div className=" flex flex-col m-auto mt-10 gap-5 w-96">
                    <h1>Add Course details : </h1>
                    <div className="flex flex-col">
                        <label>Course Name (Required)</label>
                        <input name="course_name" className="text-black" value={values.course_name} onChange={handleChange} onBlur={handleBlur} placeholder="Course Name"  required></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Description </label>
                        <input name="description" className="text-black"  value={values.description} onChange={handleChange} onBlur={handleBlur} placeholder="add description" required></input>
                    </div>  
                    <div className="flex flex-col">
                        <label>category</label>
                        <input name="category" className="text-black"  value={values.category} onChange={handleChange} onBlur={handleBlur} placeholder="add category" required></input>
                    </div>  
                    <div className="flex flex-col">
                        <label>domain</label>
                        <input value={values.domain} className="text-black"  name="domain" onChange={handleChange} onBlur={handleBlur} placeholder="add domain" required></input>
                    </div>  
                    <div className="flex flex-col">
                        <label>Image url</label>
                        <input  value={values.image_url} className="text-black"  name="image_url" onChange={handleChange} onBlur={handleBlur} placeholder="add image url" required></input>
                    </div> 
                    <div className="flex flex-col">
                        <label>Email ID</label>
                        <input value={values.email_id} className="text-black"  name="email_id" onChange={handleChange} onBlur={handleBlur} placeholder="add email_id" required></input>
                    </div>   
                    <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 font-medium rounded-lg text-sm px-7 py-2.5 mb-2">Next</button>
                </div>
            </form>
            }
            {uploadState==2 && 
                <UploadCourseVideos setNoOfVideos={setNoOfVideos} noOfVideos={noOfVideos} data={data}/>
            }
        </div>
    );
}

export default Page;