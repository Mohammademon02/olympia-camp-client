import { Link, NavLink } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import useAuth from "../../../Hooks/useAuth";


const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
    }

    const navLinkStyle = ({ isActive }) => {
        return {
            background: isActive ? 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)' : "",
            color: isActive ? 'white' : "",
        }
    }



    const navList = <>
        <li><NavLink className="px-3 py-2 rounded ml-2" style={navLinkStyle} to="/" >Home</NavLink></li>
        <li><NavLink className="px-3 py-2 rounded ml-2" style={navLinkStyle} to="/instructor" >Instructor</NavLink></li>
        <li><NavLink className="px-3 py-2 rounded ml-2" style={navLinkStyle} to="/classes">Classes</NavLink></li>
        {
            user ?
                <>
                    <li><NavLink className="px-3 py-2 rounded ml-2" style={navLinkStyle} to="/dashboard">Dashboard</NavLink></li>
                </>
                :
                <>
                </>
        }
    </>

    
    return (
        <>
            <div className="navbar max-w-screen-xl bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown z-10">
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
                    <ul className="menu menu-horizontal px-2">
                        {navList}
                    </ul>
                </div>
                <div className="navbar-end">
                    <span>
                        {
                            user ?
                                <span className="flex items-center">
                                    <div>
                                        {
                                            user?.photoURL ?
                                                <div className="w-10 rounded-full">
                                                    <img className="rounded-full" src={user?.photoURL} />
                                                </div>
                                                :
                                                <div className="w-10 rounded-full">
                                                    <FaUser></FaUser>
                                                </div>
                                        }
                                    </div>
                                    <Link onClick={handleLogOut} className="btn ml-2 bg-gradient-to-r from-[#1CB5E0] to-[#000851] text-white">Logout</Link>
                                </span>
                                :
                                <span>
                                    <Link to="/login" className="btn bg-gradient-to-r from-[#1CB5E0] to-[#000851] text-white">Login</Link>
                                </span>
                        }
                    </span>
                </div>
            </div>
        </>
    );
};

export default Navbar;