import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const PaymentHistory = () => {

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: myPaymentHistories = [] } = useQuery(['myPaymentHistories'], async () => {
        const res = await axiosSecure.get(`/myPaymentHistories?email=${user?.email}`)
        return res.data;
    })


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg bg-amber-50 text-center'>
                            <th>Sl No.</th>
                            <th>Details</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myPaymentHistories.map((myPaymentHistory, i) => <tr key={myPaymentHistory._id} className="hover text-center">
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={myPaymentHistory.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{myPaymentHistory.className}</div>
                                            <div className="text-sm opacity-70">{myPaymentHistory.instructorName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{myPaymentHistory.transactionId}</td>
                                <td>{myPaymentHistory.date}</td>
                                <td>${myPaymentHistory.price}</td>
                                <td>{myPaymentHistory.status}</td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default PaymentHistory;