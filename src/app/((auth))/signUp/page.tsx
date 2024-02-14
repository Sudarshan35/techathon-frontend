"use client";
import { useState } from "react";
// import {url} from '../url.json'

export default function Page() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    role: "Student",
  });

  const handleRoleChange = (selectedRole: string) => {
    setFormData((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));
  };

  const handleOnChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async (): Promise<void> => {
    // const response=await axios.post(`${url}`+'signup',formData);
    // console.log(response);
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="bg-slate-900 flex flex-col w-1/2 justify-between m-auto mt-10 ">
             
      <div className="form flex flex-col w-1/2 justify-between m-auto">
      <div className="left h-full w-1/2  ">
        <div className="h-12 w-80 rounded-full bg-red-50 flex border mb-10">
        <div
  className={`student h-12 w-40 rounded-full hov er:bg-black flex justify-center items-center text-purple-900 ${
    formData.role == "Student" ? " border-4 border-yellow-300": ""
  }`}
  onClick={() => handleRoleChange("Student")}
>
  Student
</div>

          <div
            className={`tutor h-12 w-40 rounded-full   border-yellow-400 flex justify-center items-center  text-purple-900 ${
              formData.role === "Tutor" ? "border-4 border-yellow-400" : ""
            }`}
            onClick={() => handleRoleChange("Tutor")}
            
          >
            Tutor
          </div>
        </div>
        </div>
        <div className="names flex w-1/2 justify-between ">
          
          <div className="firstname">
            <label htmlFor="first_name">First name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Enter first name"
              value={formData.first_name}
              onChange={handleOnChange}
              required
              className="rounded-lg text-center h-10 w-96 bg-richblack-800 mb-10"
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
              value={formData.last_name}
              onChange={handleOnChange}
              className="rounded-lg text-center h-10 w-96 bg-richblack-800 mb-10"
            />
          </div>

        <div className="email">
          <label htmlFor="email_id">Email address</label>
          <br />
          <input
            type="email"
            name="email_id"
            id="email_id"
            required
            placeholder="Enter email address"
            value={formData.email_id}
            onChange={handleOnChange}
            className="rounded-lg text-center h-10 w-96 bg-richblack-800 mb-10"
          />
        </div>
        <div className="password">
          <label htmlFor="password">Enter Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleOnChange}
            required
            className="rounded-lg text-center h-10 w-96 bg-richblack-800 mb-10"
          />
        </div>
        <div className="confirm password">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm password"
            //   value={formData.confirmpassword}
            //   onChange={handleOnChange}
            required
            className="rounded-lg text-center h-10 w-96 bg-richblack-800 mb-10"
          />
        </div>

        <div
          className="signup h-10 w-96 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleSignUp}
        >
          Sign up
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}
