import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import Payment from "../Payment/Payment";
import { useState } from "react";


const SelectedClassList = ({ selectedClass, index, handleDelete }) => {

    let [modal, setModal] = useState(false);

    const closeModal = () => {
        setModal(false)
    }


    return (
        <tr className="hover text-center">
            <th>{index + 1}</th>
            <td>{selectedClass?.className}</td>
            <td>{selectedClass?.instructorName}</td>
            <td>${selectedClass?.price}</td>
            <td>
                <Link onClick={() => setModal(true)} className="btn btn-square btn-success btn-sm">Pay</Link>
            </td>
            <td>
                <button onClick={() => handleDelete(selectedClass?._id)} className="btn btn-circle hover:bg-red-500 hover:text-white">
                    <MdDeleteForever className="text-2xl text-red-600 hover:text-white"></MdDeleteForever>
                </button>
            </td>
            <Payment isOpen={modal} closeModal={closeModal} selectedClass={selectedClass} />
        </tr>
    );
};

export default SelectedClassList;