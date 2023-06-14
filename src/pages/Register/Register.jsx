import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";


const Register = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const { createUser, googleSignIn, updateUserProfile } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, photo: data.photoURL }
                        console.log(saveUser);
                    })
                navigate("/")
            })
            .catch(error => {
                console.error(error);
            })
    };


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
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])/,
                                pattern1: /(?=.*[!@#$&*])/
                            })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                        />
                        {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-500">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have one Uppercase</p>}
                        {errors.password?.type === 'pattern1' && <p className="text-red-500">Password must have one Special Character</p>}
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

export default Register;