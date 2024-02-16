import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { userDetails } from "../../../../config";
import { useRouter } from "next/navigation";

const UploadCourseVideos=({data,noOfVideos,setNoOfVideos}:{data:any,setNoOfVideos:any,noOfVideos:number})=>{

    const [loading,setLoading]=useState(false);


    const initialValues={
        course_id:data?._id,
        name:"",
        videoFile:null,            //title of video
    }

    const {values,handleBlur,handleChange,handleSubmit,setFieldValue,resetForm}=useFormik({
        initialValues:initialValues,
        onSubmit:async(values)=>{
            try{
                setLoading(true);
                const formData=new FormData();
                formData.append('course_id',values.course_id);
                formData.append('name',values.name);
                if (values.videoFile) {
                    formData.append('videoFile', values.videoFile);
                }
                console.log(values);

                const res=await axios.post(`http://192.168.1.40:3030/uploadModule`,formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                
                if(res){
                    console.log(res.data);
                    setNoOfVideos(noOfVideos+1);
                    setLoading(false);
                    resetForm();
                    return;
                }

                console.log('error');
                setLoading(false);
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
            // Use setFieldValue to set the value of the videoFile field
            setFieldValue('videoFile', file);
        }
    };
    
    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-auto mt-10 gap-5 w-96">
                <h1>Upload videos : {noOfVideos}</h1>
                {loading && <div>Loading...</div>}
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label>Title of video</label>
                        <input value={values.name} className="text-black" name="name"  onChange={handleChange} onBlur={handleBlur} placeholder="Add video title" required></input>
                    </div>
                    <div className="flex flex-col">
                        <label>Video File</label>
                        <input type="file" name="videoFile" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 font-medium rounded-lg text-sm px-7 py-2.5 mb-2">Next</button>
                </div>
            </div>
        </form>
    );

}

export default UploadCourseVideos;
