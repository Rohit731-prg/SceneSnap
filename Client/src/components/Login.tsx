import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock  } from "react-icons/fa";
import LoginL from '../assets/Login.json';
import Lottie  from 'lottie-react';
import { Toaster } from "react-hot-toast";

function Login() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState<boolean>(false);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handelSubmit = async (e: any) => {
        e.preventDefault();

        const result = await useUserStore.getState().login(user.email, user.password);
        if(result) navigate('/dashboard');
    }
    return (
        <main className="bg-slate-800 font-primary h-screen flex flex-row items-center justify-center">

            <section className="w-1/3 px-10">
                <p className="text-white font-semibold text-4xl">Welcome Back</p>
                <p className="text-slate-400 font-primary">Sign in to your account</p>

                <form className="py-10 pr-20" onSubmit={handelSubmit}>
                    <div className="flex flex-row items-center bg-slate-500 px-5 rounded-md">
                        <FaUser />
                        <input
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full border-none outline-none px-3 py-2"
                            type="email"
                            placeholder="Email Address" />

                    </div>

                    <div className="flex flex-row items-center bg-slate-500 px-5 justify-between mt-5 rounded-md">
                        <div className="flex flex-row items-center bg-slate-500">
                            <FaLock />
                            <input
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="w-full border-none outline-none px-3 py-2"
                                type={showPass ? "text" : "password"}
                                placeholder="Password" />
                        </div>

                        <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye  />}
                        </button>
                    </div>

                    <button
                    type="submit"
                    className="w-full mt-5 py-2 bg-blue-500 rounded-md active:scale-95 transition">
                        Sign In
                    </button>
                </form>

                <p className="text-white mt-5">Don't have an account ?
                    <span onClick={() => navigate('/signup')} className="text-blue-500 cursor-pointer underline px-2">Sign up</span>
                </p>
            </section>
            <section className="w-1/3">
                <Lottie  animationData={LoginL} loop={true} />
            </section>
            <Toaster />
        </main>
    )
}

export default Login