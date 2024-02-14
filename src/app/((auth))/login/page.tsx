"use client";
import axios from "axios";
import { useState } from "react";

export default function login() {
  const [formData, setformData] = useState({
    email_id: "",
    password: "",
    role: "Student",
  });

  const [visible, setVisible] = useState(false);
  const [valid, setValid] = useState(true);
 

  const changeHandler = (e: any): void => {
    setformData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const signupHandler=():void=>{
    console.log("btn was clicked");
    // Router.push('/signup')
   
  }

  const submitHandler = async (): Promise<void> => {
    const response = await axios.post("https://localhost:3030/post", formData);
    console.log(response);

    if (response.data.success) {
    } else {
      console.log("invalid creadintials");
    }
    console.log(formData);
  };
  const handleRoleChange = (selectedRole: string) => {
    setformData((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));
  };

  return (
    <body>
      <div className="flex justify-center mt-10">
    
    <div className="form flex flex-col w-1/2 justify-between">
    
      <div className="left h-full w-1/2" >
        <div className="h-12 w-80 rounded-full  flex border mb-10">
          <div
            className={`student h-12 w-40 rounded-full hov er:bg-black flex justify-center items-center text-purple-900 ${
              formData.role == "Student" ? " border-4 border-yellow-300" : ""
            }`}
            onClick={() => handleRoleChange("Student")}
          >
            Student
          </div>

          <div
            className={`tutor h-12 w-40 rounded-full  border-yellow-400 flex justify-center items-center  text-purple-900 ${
              formData.role === "Tutor" ? "border-4 border-yellow-400" : ""
            }`}
            onClick={() => handleRoleChange("Tutor")}
          >
            Tutor
          </div>
        </div>
      </div>
      <div className="form">
        <label htmlFor="email_id">Email id</label>
        <br />
        <input
          type="mail"
          name="email_id"
          id="email_id"
          placeholder="abc@gmail.com"
          onChange={changeHandler}
          value={formData.email_id}
          className="rounded-lg text-center h-10 w-96 bg-richblack-800"
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
          placeholder="***********"
          onChange={changeHandler}
          value={formData.password}
          className="rounded-lg text-center h-10 w-96 bg-richblack-800"
          required
        />
        <br />
        <a href="#" className="text-yellow-500 text-sm mt-2 block">
            Forgot Password?
          </a>
        <br />
        <button
          type="submit"
          onClick={submitHandler}
          className="signup h-10 w-96 bg-yellow-200 rounded-full flex items-center justify-center cursor-pointer"
        >
          Sign In
        </button>
      </div>

      <div className="validity text-pink-400 ">
        {!valid && <p>invalid creadintials</p>}
      </div>

      <div className="signup">
        <br />
        <br />
        <hr className="my-4 w-96 border-t border-gray-300" />
        <br />
        <p className="text-sm ">Don't have an account</p>
        <br />
        <button className="signup h-10 w-96 bg-yellow-200 rounded-full flex items-center justify-center cursor-pointer" 
        onClick={signupHandler}
        >Sign Up</button>

      </div>
    </div>
    <div style={{background:'red'}} className=" w-96 h-96 float-center self-center" >
      <img src="src\assets\ben-kolde-bs2Ba7t69mM-unsplash.jpg" alt="image unavailable" />
    </div>

    </div>
  </body>

  );
}
