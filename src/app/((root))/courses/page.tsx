"use client"
import {useState } from "react"
import { filterData } from "./filterData";
import Filter from "@/components/student/Filters";
import CardsContainer from "@/components/student/CardsContainer";

export default function Page() {
  
    const [category,setCategory]=useState('all');
    
    console.log(category);

    return(
      <div className="container">
        <div className="filterDiv">
          {
            filterData.map((data,i)=>{
              return <Filter key={i} {...data} setCategory={setCategory}/>
            })
          }
        </div>
        
        <CardsContainer category={category}/>
      </div>
    );
  }
  