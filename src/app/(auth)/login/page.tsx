"use client";

import axios from "axios";
import { useState } from "react";
import {url} from '../url.json'

export default function login() {
  const [formData, setformData] = useState({
    email_id: "",
    password: "",
    role: "student",
  });



  const [visible, setVisible] = useState(false);

  const changeHandler=(e:any):void=>{
    setformData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
  }

const submitHandler=async():Promise<void>=>{
    const response=await axios.post('https://localhost:3030/post',formData);
   console.log(response);
    console.log(formData)
}
const handleRoleChange = (selectedRole:string) => {
    setformData((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));
  };




  return (
    <div className="form flex flex-col w-1/2 justify-between m-auto">
        <div className="left h-full w-1/2">
        <div className="h-12 w-80 rounded-full bg-red-50 flex border">
        <div
  className={`student h-12 w-40 rounded-full hov er:bg-black flex justify-center items-center text-purple-900 ${
    formData.role === "Student" ? "border-yellow-300": ""
  }`}
  onClick={() => handleRoleChange("Student")}
>
  Student
</div>

          <div
            className={`tutor h-12 w-40 rounded-full  hover:bg-black flex justify-center items-center  text-purple-900 ${
              formData.role === "Tutor" ? "border-3 border-yellow-400" : ""
            }`}
            onClick={() => handleRoleChange("Tutor")}
          >
            Tutor
          </div>
        </div>
        </div>
      <div className="form" >
        <label htmlFor="email_id">Email id</label>
        <br />
        <input
          type="mail"
          name="email_id"
          id="email_id"
          placeholder="Enter email id"
          onChange={changeHandler}
          value={formData.email_id}
          className="rounded-lg text-center h-8 w-96 bg-richblack-800"
          required
        />
        <br />
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input
          type={`${visible ? "text" : "password"}`}
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={changeHandler}
          value={formData.password}
          className="rounded-lg text-center h-8 w-96 bg-richblack-800"
          required
        />
    <br /><br />
        <button type="submit"  onClick={submitHandler}className="signup h-10 w-60 bg-yellow-200 rounded-full flex items-center justify-center cursor-pointer">
          Sign In
        </button>
      </div>
    </div>
  );
}
