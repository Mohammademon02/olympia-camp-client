import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';


const Login = () => {

    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = (data) => {
        console.log(data);
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register('email')}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                {...register('password')}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                type={showPassword ? 'text' : 'password'}
                                required
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
                    </div>

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
                </form>
            </div>
        </>
    );
};

export default Login;