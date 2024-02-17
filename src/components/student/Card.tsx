import { useRouter } from "next/navigation";

const Card=({filteredCourse}:{filteredCourse:any})=>{

  const router=useRouter();

    return(
        <div onClick={()=>router.push(`/coursePlayer/${filteredCourse._id}`)} className="card cursor-pointer rounded-lg w-[380px] flex flex-col items-center h-[375px] bg-richblack-800">
            <div className="img h-[200px] overflow-hidden w-full">
              <img className='w-full hover:scale-110 transition-transform duration-500 h-full object-cover' src={filteredCourse?.image_url} alt={"courseImg"}/>
            </div>
            <div className="title">{filteredCourse?.course_name}</div>
            <div className="info line-clamp-3">{filteredCourse?.description}</div>
            <button onClick={(e) =>{e.stopPropagation() ; router.push("/myCourses")}} className="btn px-3 py-1 mt-5 bg-yellow-100 font-[700] rounded-md text-black w-80 hover:scale-105 hover:bg-yellow-200  ">Join course</button>
          </div>
          );

  }

export default Card;