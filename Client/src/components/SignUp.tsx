import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import sign from '../assets/signup.json';


type SignUpUser = {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    conPassword: string;
    image: string | null;
};

const SignUp = () => {
    const navigate = useNavigate();
    const [signUpUser, setSignUpUser] = useState<SignUpUser>({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        conPassword: "",
        image: null,
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setSignUpUser((prev) => ({
                    ...prev,
                    image: reader.result as string,
                }));
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <main className="bg-slate-800 font-primary h-screen flex flex-row items-center justify-center">
            <section className="w-1/3 px-10">
                <p className="text-white font-semibold text-4xl">Welcome Back</p>
                <p className="text-slate-400 font-primary">Sign in to your account</p>

                <form action="" className="py-10 pr-20">
                    <input 
                    value={signUpUser.name}
                    onChange={(e) => setSignUpUser({ ...signUpUser, name: e.target.value })}
                    className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                    placeholder="Enter Your Full Name..."
                    type="text" />

                    <input 
                    value={signUpUser.email}
                    onChange={(e) => setSignUpUser({ ...signUpUser, email: e.target.value })}
                    className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                    placeholder="Enter Your Email..."
                    type="email" />

                    <input 
                    value={signUpUser.phone}
                    onChange={(e) => setSignUpUser({ ...signUpUser, phone: e.target.value })}
                    className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                    placeholder="Enter Your Phone Number..."
                    type="tel" />

                    <select 
                    value={signUpUser.role}
                    onChange={(e) => setSignUpUser({ ...signUpUser, role: e.target.value })}
                    className="">
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <input 
                    value={signUpUser.password}
                    onChange={(e) => setSignUpUser({ ...signUpUser, password: e.target.value })}
                    className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                    placeholder="Enter Your Password..."
                    type="password" />
                    <input type="password" />

                    <input 
                    value={signUpUser.conPassword}
                    onChange={(e) => setSignUpUser({ ...signUpUser, conPassword: e.target.value })}
                    className="py-2 px-5 rounded-md w-full bg-slate-500 outline-none mb-5"
                    placeholder="Confirm Your Password..."
                    type="password" />

                    <label htmlFor="image">
                        {signUpUser.image ? (
                            <div className="w-full h-40">
                                <img src={signUpUser.image} alt="" className="w-full h-full" />
                            </div>
                        ) : (
                            <div className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-500 rounded-lg bg-gray-600">
                                <p>Upload Image</p>
                                <p>Drag and drop, or browse</p>
                            </div>
                        )}
                    </label>

                    <input 
                    id="image"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    type="file" />
                </form>
                <p className="text-white mt-5">Already have an account ?
                    <span onClick={() => navigate('/')} className="text-blue-500 cursor-pointer underline px-2">Log in</span>
                </p>
            </section>

            <section className="w-1/3">
                <Lottie animationData={sign} />
            </section>
        </main>
    );
};

export default SignUp;
