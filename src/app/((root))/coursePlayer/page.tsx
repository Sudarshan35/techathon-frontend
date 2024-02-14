import CourseContent from "@/components/student/CourseContent";
import CourseDetails from "@/components/student/CourseDetails";
import VideoPlayer from "@/components/student/VideoPlayer";

const Page=()=>{

    return(
        <div className="w-full mt-6 flex justify-between  px-14">
            <div className="flex w-[950px] gap-8 flex-col">
                <VideoPlayer/>
                <CourseDetails/>
            </div>
            <CourseContent/> 
        </div>
    );
}

export default Page;