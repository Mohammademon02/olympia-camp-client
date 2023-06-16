import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";


const SelectedClassList = ({ selectedClass, index, handleDelete }) => {
    return (
        <tr className="hover text-center">
            <th>{index + 1}</th>
            <td>{selectedClass?.className}</td>
            <td>{selectedClass?.instructorName}</td>
            <td>${selectedClass?.price}</td>
            <td>
                {/* <Link onClick={() => setModal(true)} className="btn btn-square btn-neutral btn-sm">Pay</Link> */}
            </td>
            <td>
                <button onClick={() => handleDelete(selectedClass?._id)} className="btn btn-circle hover:bg-red-500 hover:text-white">
                    <MdDeleteForever className="text-2xl text-red-600 hover:text-white"></MdDeleteForever>
                </button>
            </td>
            {/* <Payment isOpen={modal} closeModal={closeModal} selectedClass={selectedClass} /> */}
        </tr>
    );
};

export default SelectedClassList;