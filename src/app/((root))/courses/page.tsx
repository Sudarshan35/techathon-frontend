"use client"
import {useEffect,useState} from "react"
import { filterData } from "./filterData";
import Filter from "@/components/student/Filters";
import CardsContainer from "@/components/student/CardsContainer";
import axios from "axios";

export default function Page() {
  
    const [category,setCategory]=useState('all');
    
    console.log(category);

    useEffect(()=>{
        
      const fetchCoursesData=async()=>{
          try{
              const res=await axios.get(`http://192.168.1.40:3030/courses`);

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

    return(
      <div className="container">
        <div className="filterDiv">
          {
            filterData.map((data,i)=>{
              return <Filter key={i} {...data} category={category} setCategory={setCategory}/>
            })
          }
        </div>
        <CardsContainer category={category}/>
      </div>
    );
  }
  