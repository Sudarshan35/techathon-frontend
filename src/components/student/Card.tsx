import { useRouter } from "next/navigation";

const Card=({data}:{data:any})=>{

  const router=useRouter();

    return(
        <div onClick={()=>router.push("/coursePlayer")} className="card cursor-pointer rounded-lg w-[380px] flex flex-col items-center h-[375px] bg-richblack-800">
            <div className="img h-[200px] overflow-hidden w-full">
              <img className='w-full  hover:scale-110  transition-transform duration-500  h-full object-cover' src={data?.image?.url} alt={data?.image?.alt}/>
            </div>
            <div className="title">
               {data.title}
            </div>
            <div className="info line-clamp-3">{data.description}</div>
            <button onClick={()=>router.push("/myCourses")} className="btn px-3 py-1.5 mt-5 bg-yellow-100 font-medium rounded-md">Join course</button>
        </div>
    );

}
export default Card;