"use client"
import Card from "@/components/card"
import { useEffect, useState } from "react"
import axios from "axios"

export default function page() {

    const [data,setdata]=useState([])

    useEffect(()=>{

        const fetch=async():Promise<void>=>{
           await axios.get("https://codehelp-apis.vercel.app/api/get-top-courses").then((res)=>{
            console.log(res)
            
            setdata(res.data.data.Development)
            console.log(res.data.data.Development);
          }).catch((err)=>{
            console.log("an error ocuured" +err)
          })
       
        }


        fetch();

    },[])
    

   





  return (
    <div className="flex flex-wrap justify-evenly ">
     {
        !data? <h1>loading</h1>:(

        data.map((item)=>
        <Card data={item} key={item} ></Card>
        
        )
        )
        }
    </div>
  )


    }