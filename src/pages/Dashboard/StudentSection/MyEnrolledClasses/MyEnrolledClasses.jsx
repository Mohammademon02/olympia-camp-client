import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const MyEnrolledClasses = () => {


    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: myEnrolledClasses = [] } = useQuery(['myEnrolledClasses'], async () => {
        const res = await axiosSecure.get(`/myEnrolledClasses?email=${user?.email}`)
        return res.data;
    })

    return (
        <div>
            <div className="overflow-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg bg-amber-50'>
                            <th>SL No.</th>
                            <th>Details</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myEnrolledClasses.map((myEnrolledClass, index) => <tr key={myEnrolledClass._id} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={myEnrolledClass.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{myEnrolledClass.className}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{myEnrolledClass.instructorName}</td>
                                <td>${myEnrolledClass.price}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MyEnrolledClasses;