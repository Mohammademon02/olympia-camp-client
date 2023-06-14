import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from 'react-icons/fc';


const SocialLogin = () => {

    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                const saveUser = { name: loggedUser.displayName, email: loggedUser.email, photo: loggedUser.photoURL }

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })


            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <>
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
        </>
    );
};

export default SocialLogin;