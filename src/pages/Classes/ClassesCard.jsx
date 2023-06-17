import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
import useInstructor from "../../Hooks/useInstructor";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";


const ClassesCard = ({ classItem }) => {

    const { user, loading } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();


    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], refetch } = useQuery({
        queryKey: ['selectedClasses'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/selectedClasses?email=${user?.email}`);
            return res.data;
        }
    });

    const { className, image, availableSeats, instructorName, price } = classItem;

    const alreadyExist = selectedClasses.find(selectedClass => selectedClass.classId === classItem._id);


    const handleSelectedClass = (_id) => {

        if (!user) {
            Navigate('/login')
            return;
        }

        let email = user?.email;
        const selectedClass = { classId: _id, email, image, className, instructorName, availableSeats, price }

        fetch('http://localhost:5000/selectedClasses', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(selectedClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class successfully selected.',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    refetch();

                }
            })
    }

    return (
        <div>
            <div className={availableSeats === 0 ? 'card card-compact w-[80%] h-[420px] bg-red-400 shadow-xl mx-auto' : 'card card-compact w-[80%] h-[420px] bg-base-100 shadow-xl mx-auto'}>
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{className}</h2>
                    <p><strong>Instructor Name:</strong> {instructorName}</p>
                    <p><strong>Available Seats:</strong> {availableSeats}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <div >
                        {
                            (availableSeats === 0 || isAdmin || isInstructor || alreadyExist) ? <button className='btn btn-neutral border-none' disabled>Select</button> : <button onClick={() => handleSelectedClass(classItem?._id)} className='btn bg-gradient-to-r from-[#1CB5E0] to-[#000851] text-white border-none'>Select</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;