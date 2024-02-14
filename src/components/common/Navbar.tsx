"use client"
import { usePathname, useRouter } from "next/navigation";

const Navbar=()=>{

    const router=useRouter();
    const pathName=usePathname();

    return(
        <nav className="flex px-4 py-3 items-center justify-between border-b-[1px] border-b-richblack-700 bg-richblack-800 ">
          <div onClick={()=>router.push("/")} className="border-2 px-3 py-1 cursor-pointer border-white-500 rounded">EdTech</div>
          <ul className="flex gap-6 text-lg">
              <li  onClick={()=>router.push("/")} className={`${pathName=="/" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Home</li>
              {/* <li  onClick={()=>router.push("/")} className="hover:text-yellow-200 cursor-pointer transition-all duration-300">About</li> */}
              <li  onClick={()=>router.push("/courses")} className={`${pathName=="/courses" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Courses</li>
              <li  onClick={()=>router.push("/community/webDev")} className={`${pathName=="/community/webDev" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Community</li>
              <li  onClick={()=>router.push("/contact")} className={`${pathName=="/contact" ? "text-yellow-200 hover:text-yellow-200" : "hover:text-yellow-500"} cursor-pointer transition-all duration-300`}>Contact</li>
          </ul>
          <div className="flex  gap-3 items-center">
            {/* <button onClick={()=>router.push("/signUp")} className="border border-yellow-200 text-white  hover:bg-transparent hover:text-yellow-500 px-3 py-1 rounded">Sign up</button> */}
            <button onClick={()=>router.push("/login")} className="border border-yellow-200 text-white hover:bg-transparent hover:text-yellow-500 px-3 py-1 rounded">Login</button>
          </div>
        </nav>
    );
}

export default Navbar;