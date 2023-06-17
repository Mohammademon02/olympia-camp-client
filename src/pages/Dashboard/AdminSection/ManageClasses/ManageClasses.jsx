import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FeedbackModal from "./FeedbackModal";


const ManageClasses = () => {

    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axios.get('http://localhost:5000/classes')
        return res.data;
    })


    const handleApprove = (classCard) => {
        fetch(`http://localhost:5000/classes/approve/${classCard._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                }
            });
    };

    const handleDeny = (classCard) => {
        fetch(`http://localhost:5000/classes/deny/${classCard._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'denied' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                }


            });
        console.log(classCard.feedback);
    };

    const handleSendFeedback = (event, classCard) => {
        event.preventDefault();

        const form = event.target;
        const feedback = form.feedback.value;

        fetch(`http://localhost:5000/classes/feedback/${classCard._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    form.reset();
                }
            });
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
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((classCard, index) => <tr key={classCard._id} className='text-center hover'>
                                <td className='font-semibold text-base'>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
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
                                    <span className='font-bold'>{classCard.instructorName}</span>
                                    <br />
                                    <span className="">{classCard.instructorEmail}</span>
                                </td>
                                <td>${classCard.price}</td>
                                <th className='capitalize'>
                                    {
                                        classCard?.status ? <span>{classCard?.status}</span> : <span>pending</span>
                                    }
                                </th>
                                <th className='space-y-3 flex flex-col'>
                                    <button onClick={() => handleApprove(classCard)} className="btn btn-success btn-xs" disabled={classCard?.status}>Approve</button>
                                    <button onClick={() => handleDeny(classCard)} className="btn btn-success btn-xs" disabled={classCard.status}>Deny</button>
                                    <div >
                                        {/* modal button */}
                                        <label htmlFor={classCard._id} className="btn btn-success btn-xs" disabled={classCard?.feedback}>
                                            Feedback
                                        </label>
                                        {/* modal body */}
                                        <FeedbackModal
                                            classCard={classCard}
                                            handleSendFeedback={handleSendFeedback}
                                        ></FeedbackModal>
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

export default ManageClasses;