import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Instructor from "../pages/Instructor/Instructor";
import Classes from "../pages/Classes/Classes";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/AdminSection/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageClasses from "../pages/Dashboard/AdminSection/ManageClasses/ManageClasses";
import InstructorRoute from "./InstructorRoute";
import AddClass from "../pages/Dashboard/InstructorSection/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/InstructorSection/MyClasses/MyClasses";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/instructor',
                element: <Instructor></Instructor>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // admin section
            {
                path: 'manageClasses',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },

            // instructor section

            {
                path: 'addClass',
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path: 'myClasses',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            }
        ]
    }
]);