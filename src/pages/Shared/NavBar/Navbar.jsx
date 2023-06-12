import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { FaUser } from 'react-icons/fa';


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
    }



    const navList = <>
        <li><Link>Home</Link></li>
        <li><Link>Instructor</Link></li>
        <li><Link>Classes</Link></li>
        {
            user ?
                <>
                    <li><Link>Dashboard</Link></li>
                </>
                :
                <>
                </>
        }
    </>
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navList}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Olympia Camp</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navList}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div>
                                        {
                                            user?.photoURL ?
                                                <div className="w-10 rounded-full">
                                                    <img src={user?.photoURL} />
                                                </div>
                                                :
                                                <FaUser></FaUser>
                                        }
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                        </a>
                                    </li>
                                    <li onClick={handleLogOut}><Link>Logout</Link></li>
                                </ul>
                            </div>
                            :
                            <Link to="/login" className="btn">Login</Link>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;