"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "../../../../config";
import { useFormik } from "formik";
import axios from "axios";
import Navbar from "@/components/common/Navbar";

export default function Page() {

  const router=useRouter();

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [role,setRole]=useState('student');

  const initialValues={
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    role: "",
    domain:"",
    name:"",
    confirm_password:"",
  };

  const {values,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:initialValues,
    onSubmit:async(values)=>{

      if(values.password!==values.confirm_password){
        setError(true);
      }

      setLoading(true);
      setError(false);
      values.role=role;
      values.name=`${values.first_name} ${values.last_name}`;
      console.log(values);

      try{
        const res=await axios.post(`${BASE_URL}/signUp`,values);

        if(res){
          console.log(res.data);
          setLoading(false);
          setError(false);
          router.push("/login");
          return
        }

        console.log("Error");
        setLoading(false);
        setError(true);
      }
      catch(error){
        console.log(error);
        setLoading(false);
        setError(true);
      }

    }
  });


  return (
    <div>
    <Navbar/>
    <div className="bg-slate-900 flex items-center px-10 py-10 my-10 w-full  justify-around h-[80vh]">
      <div className="w-[40%] rounded-2xl shadow-lg shadow-richblack-300 overflow-hidden">
        <img className="w-full object-cover h-full" src="https://onlineschoolsindia.in/wp-content/uploads/2021/11/higher-education-online-india.jpg" alt="image unavailable" />
      </div>         
      <div className="flex flex-col py-14  w-[45%] rounded-xl items-center justify-center px-10 bg-richblack-700 ">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="h-12 w-80 rounded-full m-auto bg-red-50 flex border mb-10">
        <div className={`h-12 w-40 rounded-full hov er:bg-black flex cursor-pointer justify-center items-center text-purple-900 ${role == "student" ? " border-4 border-yellow-300 text-yellow-200": ""}`} onClick={() => setRole("student")}>Student</div>
          <div
            className={`h-12 w-40 rounded-full cursor-pointer border-yellow-400 flex justify-center items-center text-purple-900 ${ role === "tutor" ? "border-4 border-yellow-400  text-yellow-200" : "" }`} onClick={() => setRole("tutor")} >Tutor</div>
        </div>
        <div className="flex gap-5">
        <div className="">
          <div className="">
            <label htmlFor="first_name">First name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Enter first name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="rounded-lg text-left pl-3 mt-2 h-10 w-72 bg-richblack-800 mb-8"
            />
          </div>
        </div>
        <div className="lastname">
            <label htmlFor="last_name">Last name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Enter last name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.last_name}
              className="rounded-lg text-left pl-3 mt-2 h-10 w-72 bg-richblack-800 "
            />
          </div>
        </div>
        <div className="flex gap-5">
        <div className="flex flex-col m-auto">
          <label htmlFor="email_id">Email address</label>
          <input
            type="email"
            name="email_id"
            id="email_id"
            required
            placeholder="Enter email address"
            value={values.email_id}
            onChange={handleChange}
            onBlur={handleBlur}
            className="rounded-lg mt-2 text-left pl-3 h-10 w-72 bg-richblack-800 mb-8"
          />
          </div>
          <div className="flex flex-col m-auto">
          <label htmlFor="email_id">Domain</label>
          <input
            type="text"
            name="domain"
            id="email_id"
            required
            placeholder="Enter your Domain"
            value={values.domain}
            onChange={handleChange}
            onBlur={handleBlur}
            className="rounded-lg mt-2 text-left pl-3 h-10 w-72 bg-richblack-800 mb-8"
          />
          </div>
        </div>
        <div className="flex gap-5">
        <div className="password">
          <label  htmlFor="password">Enter Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="rounded-lg mt-2 text-left pl-3 h-10 w-72 bg-richblack-800 mb-8"
          />
        </div>
        <div className="confirm password">
          <label>Confirm Password</label>
          <input type="password" name="confirm_password" value={values.confirm_password} placeholder="Confirm password" onChange={handleChange} onBlur={handleBlur} required className="rounded-lg mt-2 text-left pl-3 h-10 w-72 bg-richblack-800 mb-10"/>
        </div>
        </div>
        <div className="mb-7 text-pink-400 text-right ">{error && <p>invalid creadintials</p>}</div>
        <button type="submit" className="h-10 w-96 m-auto hover:bg-yellow-300 transition-all duration-300 bg-yellow-200 rounded-full flex items-center justify-center cursor-pointer">
              {loading ? (
                <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                  </svg>
                  ) : (
                  "Sign Up"
                )}
        </button>
      </form>
      </div>
    </div>
    </div>
  );
}
