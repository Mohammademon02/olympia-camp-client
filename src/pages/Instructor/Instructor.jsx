
// import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Instructor = () => {

    // const [instructors, setInstructors] = useState();

    
    const [axiosSecure] = useAxiosSecure();
    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await axiosSecure.get('/instructors')
        return res.data;
    })

    // useEffect(() => {
    //     fetch('https://olympia-camp-server.vercel.app/instructors')
    //         .then(res => res.json())
    //         .then(data => setInstructors(data))
    // }, [])

console.log(instructors);

    return (
        <div className='my-12'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto'>
                {
                    instructors?.map(instructor => <div key={instructor._id} className="card w-96 bg-slate-50 shadow-xl mx-auto">
                        <figure className="px-10 pt-10">
                            <img src={instructor.photo} alt="Shoes" className="rounded-full" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{instructor.name}</h2>
                            <p>{instructor.email}</p>
                            <div className="card-actions">
                                <button className="btn bg-gradient-to-r from-[#1CB5E0] to-[#000851] text-white">See Classes</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructor;