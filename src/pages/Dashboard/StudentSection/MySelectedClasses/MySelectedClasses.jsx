import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SelectedClassList from "./SelectedClassList";
import Swal from "sweetalert2";


const MySelectedClasses = () => {


    const { user } = useAuth();


    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], refetch } = useQuery(['selectedClasses'], async () => {
        const res = await axiosSecure.get(`/selectedClasses?email=${user?.email}`)
        return res.data;
    })



    const handleDelete = _id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selectedClasses/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(

                                'Deleted!',
                                'Your selected class has been deleted.',
                                'success'
                            )
                            refetch()
                        }
                    })
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