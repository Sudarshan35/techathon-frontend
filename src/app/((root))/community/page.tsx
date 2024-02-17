"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Communities from "@/components/student/communities";
import { BASE_URL } from "../../../../config";
import Cookies from "js-cookie";

export default function Page() {

  const [communities, setCommunities] = useState<any>([]);

  useEffect(() => {
    const fetchCommunity = async (): Promise<void>=> {

        const token = Cookies.get('token');
        console.log(token);
    const response=await axios.get(`${BASE_URL}/myCourses`,{headers:{'Authorization':`Bearer ${token} `}}); 

      if(response){
        console.log(response);
      }
    };

    fetchCommunity();
  });


  return (
    <div className="flex h-full w-full">
    <Communities communities={communities} setCommunities={setCommunities}></Communities>
    </div>
  );
}
