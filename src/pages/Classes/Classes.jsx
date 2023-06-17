// import { useEffect, useState } from "react";
import ClassesCard from "./ClassesCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Classes = () => {
    // const [classes, setClasses] = useState(); 

    const { data: classes = [], } = useQuery(['classes'], async () => {
        const res = await axios.get('https://olympia-camp-server.vercel.app/classesList')
        return res.data;
    })

    // useEffect(() =>{
    //     fetch(`https://olympia-camp-server.vercel.app/classesList`)
    //     .then(res => res.json())
    //     .then(data => setClasses(data))
    // } ,[])


    return (
        <div>
            <div className='my-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        classes?.map(classItem => <ClassesCard
                        key={classItem._id}
                        classItem={classItem}
                        ></ClassesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Classes;