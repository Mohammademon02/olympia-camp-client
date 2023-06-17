import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SelectedClassList from "./SelectedClassList";


const MySelectedClasses = () => {


    const { user } = useAuth();


    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], refetch } = useQuery(['selectedClasses'], async () => {
        const res = await axiosSecure.get(`/selectedClasses?email=${user?.email}`)
        return res.data;
    })


    
    const handleDelete = _id => {

        fetch(`http://localhost:5000/selectedClasses/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                }
            })
    }


    return (
        <div>
            <div className="overflow-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg bg-amber-50 text-center'>
                            <th>Sl No.</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClasses?.map((selectedClass, index) => <SelectedClassList
                                key={selectedClass._id}
                                selectedClass={selectedClass}
                                index={index}
                                handleDelete={handleDelete}
                            ></SelectedClassList>)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MySelectedClasses;