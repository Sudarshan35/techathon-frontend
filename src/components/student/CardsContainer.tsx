import Card from './Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
    id: string;
    title: string;
}

function CardsContainer({ category }: { category: string }) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://codehelp-apis.vercel.app/api/get-top-courses')
            .then((res) => {
                
                const courseData: { [key: string]: Course[] } = res?.data?.data;
                const mergedArray: Course[] = Object.values(courseData).reduce((acc, val) => acc.concat(val), []);
                
                setLoading(false);
                
                if (category === 'Design' || category === 'Development' || category === "Business" || category === "Lifestyle") {
                    setCourses(courseData[category] || []);
                } else {
                    setCourses(mergedArray);
                }
            })
            .catch((err) => {
                console.log("An error occurred while fetching the API");
                console.log(err);
                setLoading(false);
            });
    }, [category]);

    return (
        <div className="cards">
           {courses.map((data,i)=>{
                return <Card key={i} data={data}></Card>
            })} 
        </div>
    );
}

export default CardsContainer;