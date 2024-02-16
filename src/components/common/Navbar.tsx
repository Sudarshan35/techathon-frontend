"use client"
import { usePathname, useRouter } from "next/navigation";
import { userDetails } from "../../../config";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar=()=>{
  
    const router=useRouter();
    const pathName=usePathname();
    const [user,setUser]=useState<any>('empty');

    useEffect(()=>{
      setUser(userDetails);
    },[]);

    const [showLogout,setShowLogout]=useState(false);
  
    const handleLogOut=()=>{
      localStorage.removeItem('user');
      Cookies.remove('token');
      router.push("/");
      window.location.reload();
    }

    console.log(user);

    return(
        <nav className="flex px-6 py-3 items-center justify-between border-b-[1px] border-b-richblack-700 bg-richblack-800 ">
          <div onClick={()=>router.push("/")} className={`border-2 px-3 ${user ? "mr-24" : "mr-0"} py-1 cursor-pointer border-white-500 rounded`}>EdTech</div>
          {(user == null || user?.role == 'student')  && 
          <ul className="flex gap-6 text-lg">
              <li  onClick={()=>router.push("/")} className={`${pathName=="/" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Home</li>
              <li  onClick={()=>router.push("/courses")} className={`${pathName=="/courses" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Courses</li>
              <li  onClick={()=>router.push("/community")} className={`${pathName=="/community" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Communities</li>
              <li  onClick={()=>router.push("/myCourses")} className={`${pathName=="/myCourses" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>My Courses</li>
          </ul>
          }
          {user!=='empty' && user?.role=='tutor' && 
          <ul className="flex gap-6 text-lg">
            <li  onClick={()=>router.push("/")} className={`${pathName=="/" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Home</li>
            <li  onClick={()=>router.push("/tutor")} className={`${pathName=="/myCourses" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>My Courses</li>
            <li  onClick={()=>router.push("/myCommunities")} className={`${pathName=="/tutor/community" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>My Communities</li>
            <li  onClick={()=>router.push("/courses")} className={`${pathName=="/contact" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Courses</li>
          </ul>
          }
          <div className="flex relative gap-3 items-center">
            {/* <button onClick={()=>router.push("/signUp")} className="border border-yellow-200 text-white  hover:bg-transparent hover:text-yellow-500 px-3 py-1 rounded">Sign up</button> */}
            {user==null && <button onClick={()=>router.push("/login")} className="border border-yellow-200 text-white hover:bg-transparent hover:text-yellow-500 px-3 py-1 rounded">Login</button>}
            {user!='empty' && user!=null && 
              <div className="flex gap-3 items-center">
                <p className="text-lg">Hello, {user?.name?.match(/^\S+/)}</p>
                <div onClick={()=>setShowLogout(!showLogout)} className="w-10 bg-blue-200 cursor-pointer rounded-full py-2 px-4 justify-center flex">
                  <p>{user?.name?.charAt(0)}</p>
                  <p>{user?.name?.split(' ')[1]?.charAt(0)}</p>
                </div>
                {showLogout && <button onClick={handleLogOut} className="absolute text-sm hover:bg-richblack-600 text-yellow-200 transition-all duration-300 right-0 px-2 py-1.5 pb-2 flex items-center bg-richblack-700 rounded-lg top-[62px]">Log Out</button>}
              </div>
            }
          </div>
        </nav>
    );
}

export default Navbar;