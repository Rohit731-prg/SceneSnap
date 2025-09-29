import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import sign from '../assets/Login.json';
import toast, { Toaster } from 'react-hot-toast';
import useUserStore from "../store/userStore";

interface SignUpUser {
    name: string;
    email: string;
    password: string;
    conPassword: string;
    image: string | null;
};

const SignUp = () => {
    const navigate = useNavigate();
    const [signUpUser, setSignUpUser] = useState<SignUpUser>({
        name: "",
        email: "",
        password: "",
        conPassword: "",
        image: null,
    });
    

    const handelSubmit = async (e: any) => {
        e.preventDefault();
        if (signUpUser.password !== signUpUser.conPassword) return toast.error("Password and Confirm Password do not match");
        if (!signUpUser.image) return toast.error("Please upload an image");
        
        await useUserStore.getState().registerUser(
            signUpUser.name,
            signUpUser.email,
            signUpUser.password,
            (document.getElementById('image') as HTMLInputElement).files![0]
        );
        navigate('/otp');
    }

    return (
        <main className="bg-slate-800 font-primary min-h-screen flex flex-col md:flex-row items-center justify-center p-5">
            <section className="w-full md:w-1/2 lg:w-1/3 px-4">
                <Lottie animationData={sign} className="w-full h-full" />
            </section>
            <section className="w-full md:w-1/2 lg:w-1/3 px-4 md:px-10 mb-10 md:mb-0">
                <p className="text-white font-semibold text-3xl md:text-4xl">Welcome Back</p>
                <p className="text-slate-400 mt-2">Sign in to your account</p>

                <form action="" className="py-6 md:py-10" onSubmit={handelSubmit}>
                    <input 
                        value={signUpUser.name}
                        onChange={(e) => setSignUpUser({ ...signUpUser, name: e.target.value })}
                        className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                        placeholder="Enter Your Full Name..."
                        required
                        type="text" />

                    <input 
                        value={signUpUser.email}
                        onChange={(e) => setSignUpUser({ ...signUpUser, email: e.target.value })}
                        className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                        placeholder="Enter Your Email..."
                        required
                        type="email" />

                    <input 
                        value={signUpUser.password}
                        onChange={(e) => setSignUpUser({ ...signUpUser, password: e.target.value })}
                        className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                        placeholder="Enter Your Password..."
                        required
                        type="password" />

                    <input 
                        value={signUpUser.conPassword}
                        onChange={(e) => setSignUpUser({ ...signUpUser, conPassword: e.target.value })}
                        className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                        placeholder="Confirm Your Password..."
                        required
                        type="password" />

                    <label htmlFor="image" className="block mb-5 cursor-pointer">
                        {signUpUser.image ? (
                            <div className="w-full h-40">
                                <img src={signUpUser.image} alt="Profile Preview" className="w-full h-full object-cover rounded-lg" />
                            </div>
                        ) : (
                            <div className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-500 rounded-lg bg-gray-600">
                                <p className="text-white">Upload Image</p>
                                <p className="text-slate-300 text-sm">Drag and drop, or browse</p>
                            </div>
                        )}
                    </label>

                    <input 
                        id="image"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setSignUpUser({
                            ...signUpUser,
                            image: e.target.files ? URL.createObjectURL(e.target.files[0]) : null})}
                        type="file" />

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                            Submit
                        </button>
                </form>

                <p className="text-white mt-5 text-center">
                    Already have an account?{" "}
                    <span onClick={() => navigate('/')} className="text-blue-500 cursor-pointer underline px-2">
                        Log in
                    </span>
                </p>
            </section>
            <Toaster />
        </main>
    );
};

export default SignUp;
