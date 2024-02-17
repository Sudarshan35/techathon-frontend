"use client"
import {useEffect,useState} from "react"
import axios from "axios";
import Card from "@/components/student/Card";
import { BASE_URL } from "../../../../config";

export default function Page() {
  
    const [data,setData]=useState([]);
    const [category,setCategory]=useState<any>('all');

    useEffect(()=>{
        
    const fetchCoursesData=async()=>{
        try{
            const res=await axios.get(`${BASE_URL}/courses`);

            if(res){
                console.log(res.data);
                setData(res.data?.data);
            }
        }
        catch(error){
            console.log(error);
        }
      }

      fetchCoursesData();

    },[]);

    console.log(category);
    console.log(data);

    
    return(
    <div className="flex flex-col w-full ">
       {data.length==0  ? (
        <div className="flex flex-col justify-center items-center w-full h-[80vh]">
            <div className="text-center">
                <p className="text-xl">Loading...</p>
            </div>
        </div>
        ):(
            <div className="flex flex-col mt-10 w-full ">
                <div className="flex m-auto gap-5">
                    <button onClick={(e)=>setCategory(e.currentTarget.getAttribute('value'))} value={"all"} className={`${category=='all' ? "text-yellow-100 border-yellow-100 " : ""} transition-all  duration-300 hover:text-yellow-100 border border-transparent px-6 py-2 bg-richblack-700 hover:border-yellow-200 rounded-md`}>All</button>
                    <button onClick={(e)=>setCategory(e.currentTarget.getAttribute('value'))} value={'Web technology'} className={`${category=='DSA' ? "text-yellow-100 border-yellow-100" : ""} transition-all duration-300 hover:text-yellow-100 border border-transparent  px-6 py-2 bg-richblack-700 hover:border-yellow-200 rounded-md`}>Technology</button>
                    <button onClick={(e)=>setCategory(e.currentTarget.getAttribute('value'))} value={'biology'} className={`${category=='biology' ? "text-yellow-100  border-yellow-100" : ""}  transition-all duration-300 hover:text-yellow-100 border border-transparent  px-6 py-2 bg-richblack-700 hover:border-yellow-200 rounded-md`}>Biology</button>
                    <button onClick={(e)=>setCategory(e.currentTarget.getAttribute('value'))} value={'ui_ux'}  className={`${category=='ui_ux' ? "text-yellow-100 border-yellow-100" : ""} transition-all duration-300 hover:text-yellow-100 border border-transparent  px-6 py-2 bg-richblack-700 hover:border-yellow-200 rounded-md`}>UI UX</button>
                    <button onClick={(e)=>setCategory(e.currentTarget.getAttribute('value'))} value={'business'}  className={`${category=='business' ? "text-yellow-100 border-yellow-100" : ""} transition-all duration-300 hover:text-yellow-100 border px-6 py-2 bg-richblack-700 border-transparent hover:border-yellow-200 rounded-md`}>Business</button>
                </div>
                <div className="flex mt-10 gap-5 flex-wrap w-full justify-center">
                    {data.filter(course=>course?.category===category||category==='all').map((filteredCourse)=>{
                        return(
                            <Card key={filteredCourse?._id} filteredCourse={filteredCourse}/>
                        );
                    })}
                </div>
            </div>
        )}
        </div>
    );
  }
  