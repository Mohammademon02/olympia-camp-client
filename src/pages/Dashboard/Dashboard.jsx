import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";
import { FaCashRegister, FaHistory, FaHome, FaPlusSquare, FaRegBookmark, FaTachometerAlt, FaTasks, FaUserEdit } from "react-icons/fa";


const Dashboard = () => {

    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    // const isAdmin = true;
    // const isInstructor = true;


    const navLinkStyle = ({ isActive }) => {
        return {
            background: isActive ? 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)' : "",
            color: isActive ? 'white' : "",
        }
    }


    return (
        <div className='my-2'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div className='mx-6 my-6'>
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side drop-shadow-lg">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu text-lg space-y-3 font-semibold p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <div className='flex flex-col items-center mx-auto'>
                            <div className="avatar">
                                <div className="w-24 mask mask-circle">
                                    <img src={user.photoURL} />
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title mt-3">{user.displayName}</h2>
                            </div>
                        </div>

                        <div className="divider"></div>

                        {/* Student */}
                        {
                            (!isAdmin && !isInstructor) && <>
                                <li><NavLink to='/dashboard/mySelectedClasses' className="px-3 py-2 rounded" style={navLinkStyle}><FaRegBookmark></FaRegBookmark> My Selected Classes</NavLink></li>
                                <li><NavLink to='/dashboard/myEnrolledClasses' className="px-3 py-2 rounded" style={navLinkStyle}><FaCashRegister></FaCashRegister> My Enrolled Classes</NavLink></li>
                                <li><NavLink to='/dashboard/paymentHistory' className="px-3 py-2 rounded" style={navLinkStyle}><FaHistory></FaHistory> Payment History</NavLink></li>
                            </>
                        }

                        {/* Instructor */}
                        {
                            isInstructor && <>
                                <li><NavLink to='/dashboard/addClass' className="px-3 py-2 rounded" style={navLinkStyle}><FaPlusSquare></FaPlusSquare> Add a Class</NavLink></li>
                                <li><NavLink to='/dashboard/myClasses' className="px-3 py-2 rounded" style={navLinkStyle}><FaTachometerAlt></FaTachometerAlt> My Classes</NavLink></li>
                            </>
                        }

                        {/* Admin */}
                        {
                            isAdmin && <>
                                <li><NavLink to='/dashboard/manageClasses' className="px-3 py-2 rounded" style={navLinkStyle}><FaTasks></FaTasks> Manage Classes</NavLink></li>
                                <li><NavLink to='/dashboard/manageUsers' className="px-3 py-2 rounded" style={navLinkStyle}><FaUserEdit></FaUserEdit> Manage Users</NavLink></li>
                            </>
                        }

                        <div className="divider"></div>

                        <li><NavLink to="/" className="px-3 py-2 rounded" style={navLinkStyle}><FaHome></FaHome> Home</NavLink></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;













