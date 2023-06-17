import { FaUserEdit } from "react-icons/fa";


const MyClassesList = ({classCard, index, handleEditClass}) => {

    const { image, _id, className, availableSeats, status, price,feedback,} =classCard;
    return (
        <tr key={_id} className='text-center hover'>
            <td className='font-semibold text-base'>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{className}</div>
                        <div className="text-sm opacity-70">Available Seats: {availableSeats}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="">Enroll Count</span>
            </td>
            <td>${price}</td>
            <th className='capitalize text-green-500'>
                {
                    status ? <span>{status}</span> 
                    :
                    <span className="text-yellow-500">pending</span>
                }
            </th>
            <th className='capitalize w-40'>
                {
                    feedback ? <span><small>{classCard.feedback}</small></span> : <span><small>No feedback</small></span>
                }
            </th>
            <th className=''>
                {/* modal button */}
                <label htmlFor={_id} className="btn btn-success btn-md"><FaUserEdit></FaUserEdit></label>

                {/* modal body */}
                <input type="checkbox" id={_id} className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box whitespace-normal items-start">
                        <label htmlFor={classCard._id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        {/* <h1 className='text-2xl font-bold'>{toyName}</h1> */}
                        <form onSubmit={(event) => handleEditClass(event, _id)}>
                            {/* form class name and image row */}

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Class Name</span>
                                </label>
                                <label>
                                    <input type="text" name="className" defaultValue={className} placeholder="Class Name" className="input input-bordered w-full font-normal" />
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Class Image</span>
                                </label>
                                <label>
                                    <input type="url" name="classImage" defaultValue={image} placeholder="Class Image" className="input input-bordered w-full font-normal" />
                                </label>
                            </div>

                            {/* form available seats url and price row */}

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Available Seats</span>
                                </label>
                                <label>
                                    <input type="text" name="availableSeats" defaultValue={availableSeats} placeholder="Available Seats" className="input input-bordered w-full font-normal" />
                                </label>
                            </div>
                            <div className="form-control w-full mb-6">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <label>
                                    <input type="text" name="price" defaultValue={price} placeholder="Price" className="input input-bordered w-full font-normal" />
                                </label>
                            </div>


                            <input type="submit" value="Update Class" className="btn btn-block btn-success border-none" />
                        </form>
                    </div>
                </div>
            </th>
        </tr>
    );
};

export default MyClassesList;