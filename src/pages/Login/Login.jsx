import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";



    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
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
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
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
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="divider">OR</div>
                    </div>
                    <div className="w-full">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-full px-4 py-3 border border-gray-300 "
                        >
                            <div className="flex items-center justify-center ">
                                <FcGoogle></FcGoogle>
                                <span className="ml-2">Login with Google</span>
                            </div>
                        </button>
                        <br />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;