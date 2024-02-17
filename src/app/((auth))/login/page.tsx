"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "../../../../config";
import Cookies from "js-cookie";
import Navbar from "@/components/common/Navbar";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";

export default function Page() {
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();

  const initialValues = {
    email_id: "",
    password: "",
    role: "",
  };

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [role, setRole] = useState("student");

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      setErrors(false);
      values.role = role;
      console.log(values);

      try {
        const res = await axios.post(`${BASE_URL}/login`, values);

        if (res) {
          console.log(res.data);
          setLoading(false);
          setErrors(false);
          Cookies.set("token", res.data?.token);
          localStorage.setItem("user", JSON.stringify(res.data?.user));
          router.push("/");
          return;
        }

        console.log("Error");
        setLoading(false);
        setErrors(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErrors(true);
      }
    },
  });

  return (
    <body>
      <Navbar />
      <div className="flex w-full px-10 h-[90vh]  items-center justify-evenly">
        <div className="flex py-12 px-7  rounded-xl bg-richblack-700 flex-col justify-between">
          <div className="h-full flex">
            <div className="h-12 ml-8 w-80 rounded-full flex border mb-10">
              <div
                onClick={() => setRole("student")}
                className={`h-12 cursor-pointer w-40 rounded-full hov er:bg-black flex justify-center items-center text-purple-900 ${
                  role == "student"
                    ? " border-4 border-yellow-300 text-yellow-200"
                    : ""
                }`}
              >
                Student
              </div>
              <div
                onClick={() => setRole("tutor")}
                className={` h-12 w-40 cursor-pointer rounded-full  border-yellow-400 flex justify-center items-center  text-purple-900 ${
                  role === "tutor"
                    ? "border-4 border-yellow-400 text-yellow-200"
                    : ""
                }`}
              >
                Tutor
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email_id">Email id</label>
            <br />
            <input
              type="mail"
              name="email_id"
              id="email_id"
              placeholder="abc@gmail.com"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email_id}
              className="rounded-lg text-center mt-2 h-10 w-96 bg-richblack-800"
              required
            />
            <br />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <div className="password relative">
              <span>
                {" "}
                <input
                  name="password"
                  id="password"
                  type={`${visible ? "text" : "password"}`}
                  placeholder="*"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="rounded-lg mt-2 text-center h-10 w-96 bg-richblack-800 "
                  required
                />
              </span>
              <span>
                {visible ? (
                  <FaRegEye
                    className="text-richblack-5  absolute top-5 right-2 "
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="text-richblack-5  absolute top-5 right-2"
                    onClick={() => setVisible(true)}
                  />
                )}
              </span>
            </div>

            <br />
            <a href="#" className="text-yellow-500 text-sm mt-2 block">
              Forgot Password?
            </a>
            <br />
            <button
              type="submit"
              className="h-10 w-96 bg-yellow-200 hover:bg-yellow-300 transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer">
              {loading ? (
                <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <div className="mt-2 ml-2 text-pink-400 ">
            {errors && <p>invalid creadintials</p>}
          </div>
          <div className="">
            <br />
            <hr className=" w-96 border-t border-gray-300" />
            <br />
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-center">Do not have an account ??</p>
              <button
                onClick={() => router.push("/signUp")}
                className="h-10 w-96 bg-yellow-200 hover:bg-yellow-300 transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="w-[40%] rounded-2xl shadow-lg shadow-richblack-300 overflow-hidden">
          <img className="w-full object-cover h-full" src="https://onlineschoolsindia.in/wp-content/uploads/2021/11/higher-education-online-india.jpg" alt="image unavailable"/>
        </div>
      </div>
    </body>
  );
}