import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import MyClassesList from "./MyClassesList";
import Swal from "sweetalert2";


const MyClasses = () => {

    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: myClasses = [], refetch } = useQuery(['myClasses'], async () => {
        const res = await axiosSecure.get(`/myClasses?email=${user?.email}`)
        return res.data;
    })


    const handleEditClass = (event, _id) => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const classImage = form.classImage.value;
        const availableSeats = parseInt(form.availableSeats.value);
        const price = parseInt(form.price.value);

        const updatedClass = { className, classImage, availableSeats, price }

        console.log(updatedClass);

        // send data to the server
        fetch(`http://localhost:5000/classes/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Class is updated',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    refetch()
                    form.reset();
                }
            })
    }


    return (
        <div className='my-12'>
            <div className="overflow-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-center bg-purple-100 text-base'>
                            <th>Sl No.</th>
                            <th>Classes</th>
                            <th>Enrolled</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Update Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myClasses.map((classCard, index) => <MyClassesList
                            key={classCard._id}
                            index={index}
                            classCard={classCard}
                            handleEditClass={handleEditClass}
                            ></MyClassesList>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default MyClasses;