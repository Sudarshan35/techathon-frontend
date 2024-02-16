"use client"
import axios from "axios";
import { useEffect} from "react";
import { BASE_URL } from "../../../config";
import Cookies from "js-cookie";

export default function Home() {

    useEffect(()=>{

        const fetchData=async()=>{

            try{

                const token = Cookies.get('token');
                console.log(token);
                const res=await axios.get(`${BASE_URL}/get`,{headers:{'Authorization':`Bearer ${token} `}});
            
                if(res){
                    console.log(res.data);
                    return;
                }
            }
            catch(error){
                console.log(error);
            };
        };

        fetchData();

    },[]);
    
    return (
        <div>Hello</div>
    );
    
}
