import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaUserEdit } from "react-icons/fa";


const MyClasses = () => {

    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: myClasses = [], refetch } = useQuery(['myClasses'], async () => {
        const res = await axiosSecure.get(`/myClasses?email=${user?.email}`)
        return res.data;
    })


    const handleEditClass = (event, classCard) => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const classImage = form.classImage.value;
        const availableSeats = parseInt(form.availableSeats.value);
        const price = parseInt(form.price.value);

        const updatedClass = { className, classImage, availableSeats, price }

        console.log(updatedClass);

        // send data to the server
        fetch(`http://localhost:5000/classes/${classCard._id}`, {
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
                    refetch()
                }
            })
    }


    return (
        <div className='my-12'>
            <div className="overflow-x-auto">
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
                            myClasses.map((classCard, index) => 
                            <tr key={classCard._id} className='text-center hover'>
                                <td className='font-semibold text-base'>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={classCard.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{classCard.className}</div>
                                            <div className="text-sm opacity-70">Available Seats: {classCard.availableSeats}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="">Enroll Count</span>
                                </td>
                                <td>${classCard.price}</td>
                                <th className='capitalize'>
                                    {
                                        classCard?.status ? <span>{classCard?.status}</span> : <span>pending</span>
                                    }
                                </th>
                                <th className='capitalize w-40'>
                                    {
                                        classCard?.feedback ? <span><small>{classCard.feedback}</small></span> : <span><small>No feedback</small></span>
                                    }
                                </th>
                                <th className=''>
                                    {/* modal button */}
                                    <label htmlFor={classCard._id} className="btn btn-success btn-md"><FaUserEdit></FaUserEdit></label>

                                    {/* modal body */}
                                    <input type="checkbox" id={classCard._id} className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box whitespace-normal items-start">
                                            <label htmlFor={classCard._id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                            {/* <h1 className='text-2xl font-bold'>{toyName}</h1> */}
                                            <form onSubmit={(event) => handleEditClass(event, classCard)}>
                                                {/* form class name and image row */}

                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Class Name</span>
                                                    </label>
                                                    <label>
                                                        <input type="text" name="className" defaultValue={classCard.className} placeholder="Class Name" className="input input-bordered w-full font-normal" />
                                                    </label>
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Class Image</span>
                                                    </label>
                                                    <label>
                                                        <input type="url" name="classImage" defaultValue={classCard.image} placeholder="Class Image" className="input input-bordered w-full font-normal" />
                                                    </label>
                                                </div>

                                                {/* form available seats url and price row */}

                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Available Seats</span>
                                                    </label>
                                                    <label>
                                                        <input type="text" name="availableSeats" defaultValue={classCard.availableSeats} placeholder="Available Seats" className="input input-bordered w-full font-normal" />
                                                    </label>
                                                </div>
                                                <div className="form-control w-full mb-6">
                                                    <label className="label">
                                                        <span className="label-text">Price</span>
                                                    </label>
                                                    <label>
                                                        <input type="text" name="price" defaultValue={classCard.price} placeholder="Price" className="input input-bordered w-full font-normal" />
                                                    </label>
                                                </div>


                                                <input type="submit" value="Update Class" className="btn btn-block btn-success border-none" />
                                            </form>
                                        </div>
                                    </div>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default MyClasses;