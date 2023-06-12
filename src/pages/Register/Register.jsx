import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";


const Register = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate("/")
            })
            .catch(error => {
                console.error(error);
            })
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form
                    className="w-full max-w-md bg-white p-6 rounded shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/* Name  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            {...register('name', { required: true })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                        />
                        {errors.name && <span className="text-red-500">Name is required</span>}
                    </div>

                    {/* Email  */}
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
                        <input
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                        />
                        {errors.password && errors.password.type === 'minLength' && (
                            <span className="text-red-500 text-sm mt-1">
                                Password must be at least 6 characters long.
                            </span>
                        )}
                        {errors.password && errors.password.type === 'pattern' && (
                            <span className="text-red-500 text-sm mt-1">
                                Password must contain at least one uppercase letter, one lowercase letter, one special character, and one digit.
                            </span>
                        )}
                    </div>


                    {/* confirm password  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            {...register('confirmPassword', {
                                required: true,
                                validate: (value) => value === watch('password'),
                            })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500">Passwords do not match</span>
                        )}
                    </div>

                    {/* photo  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoURL">
                            Photo URL
                        </label>
                        <input
                            {...register('photoURL', { required: true })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="url"

                        />
                    </div>

                    {/* register button  */}
                    <div className="mb-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-700">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:text-blue-700" href="/registration">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;