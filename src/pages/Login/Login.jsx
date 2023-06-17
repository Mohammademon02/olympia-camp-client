import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Logged in successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error);
            })
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form
                    className="w-full max-w-md bg-white p-6 rounded shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/* email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register('email', { required: true })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                        />
                        {errors.email && <span className="text-red-500">Email is required</span>}
                    </div>

                    {/* password  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('password', { required: true })}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                type={showPassword ? 'text' : 'password'}

                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <AiFillUnlock></AiFillUnlock>
                                ) : (
                                    <AiFillLock></AiFillLock>
                                )}
                            </div>
                        </div>
                        {errors.password && <span className="text-red-500">Please provide valid password</span>}
                    </div>

                    {/* Login button  */}
                    <div className="mb-4">
                        <button
                            className="bg-gradient-to-r from-[#1CB5E0] to-[#000851] text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-700">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-500 hover:text-blue-700" href="/registration">
                                Register
                            </Link>
                        </p>
                    </div>

                    {/* google signin  */}
                    <SocialLogin></SocialLogin>
                </form>
            </div>
        </>
    );
};

export default Login;