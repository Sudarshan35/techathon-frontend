import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config";
import { useRouter } from "next/navigation";

//to put loding for video upload

const UploadCourseVideos=({data,noOfVideo,setNoOfVideo}:{data:any,setNoOfVideo:any,noOfVideo:number})=>{

    const [loading,setLoading]=useState<boolean>(false);

    const router=useRouter();

    const initialValues={
        course_id:data?._id,
        name:"",
        videoFile:null,
        title:"",            //title of video
    }

    useEffect(()=>{

    },[]);


    const {values,handleBlur,handleChange,handleSubmit,setFieldValue}=useFormik({
        initialValues:initialValues,
        onSubmit:async(values)=>{
            try{
                setLoading(true);
                const formData=new FormData();
                values.title=values.name;
                formData.append('course_id',values.course_id);
                formData.append('name',values.name);
                formData.append('title',values.title);
                if (values.videoFile) {
                    formData.append('videoFile', values.videoFile);
                }
                console.log(values);
                console.log('uploading to cloud.....');
                const uploadVideoToCloud=await axios.post(`${BASE_URL}/uploadModule`,formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                
                if(uploadVideoToCloud){

                    console.log("uploaded to cloud successfully",uploadVideoToCloud.data);
                    console.log('uploading to local storage.....');

                    const uploadToLocalStorage=await axios.post(`${BASE_URL}/subtitles`,formData,{
                        headers:{
                            'Content-Type':'multipart/form-data'
                        } 
                    });

                    if(uploadToLocalStorage){

                        console.log("uploaded to local storage successfully",uploadToLocalStorage.data);
                        const id=uploadVideoToCloud.data.data._id;  
                        const formData={
                            _id:id,
                            title:values.title,
                        }
                        console.log(formData);
                        console.log('creating subtitles.....');

                        const createSubtitles=await axios.post(`${BASE_URL}/subtitle`,formData);

                        if(createSubtitles){
                            console.log("subtitle created successfully");
                            setLoading(false);
                            console.log(createSubtitles.data);
                            return;
                        }
                    }

                console.log('error');
                setLoading(false);
            }
        }
        catch(error){

            console.log(error);
            setLoading(false);
        }
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setFieldValue('videoFile', file);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            {loading && <div>Loading....</div>}
            <div className="flex flex-col m-auto my-5 gap-5 w-96">
                <h1 className="m-auto text-yellow-200 text-lg">Upload Video : {noOfVideo}</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-1 flex-col">
                        <label>Add Video title</label>
                        <input value={values.name} style={{"boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset"}} name="name" className="text-richblack-5 bg-opacity-80 bg-richblack-800 px-2 py-2 rounded-lg" onChange={handleChange} onBlur={handleBlur} placeholder="eg. Lec 01 : Introduction " required></input>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <label>Add Video File</label>
                        <input required type="file" name="videoFile" onChange={handleFileChange} className="border-2 border-richblack-600  rounded-md p-2"/>
                    </div>
                    <div className="flex mt-3  m-auto gap-3">
                        <button className=" px-3 py-2 mt-2 bg-yellow-100 font-[700] rounded-md text-black w-32 transition-all duration-300  hover:bg-yellow-200">Upload video</button> 
                        <button onClick={()=>router.push("/tutor")} className=" px-3 py-2 mt-2 font-[700] rounded-md text-richblack-100 bg-opacity-80 bg-richblack-800 w-32 transition-all duration-300  hover:bg-richblack-600">Done</button>
                    </div>                            
                </div>
            </div>
        </form>
    );

}

export default UploadCourseVideos;
