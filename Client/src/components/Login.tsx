import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnUXVHwPtfOqBe9mm099xh1DJ71zWVHuCwN9vGjkx1fi09kDx7_wyaldRkzWWRQJ6gT1U&usqp=CAU";
    const [showPass, setShowPass] = useState<Boolean>(true);
    return (
        <main className="bg-slate-800 py-10 px-80 font-primary h-screen">
            <img src={image} alt="" className="w-full h-96 object-cover rounded-lg" />

            <section className="my-10">
                <p className="text-center text-white font-semibold text-4xl">Welcome Back</p>

                <form className="flex flex-col gap-4 items-center justify-center w-full px-96 mt-10">
                    <input
                        placeholder="Enter Email Address"
                        className="px-5 py-2 border-none outline-none bg-slate-500 w-full rounded-lg"
                        type="email" />

                    <div className="flex items-center justify-between px-5 py-2 border-none outline-none bg-slate-500 w-full rounded-lg">
                        <input
                            placeholder="Enter Password"
                            className=""
                            type="password" />

                        <div>
                            <input type="text" />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <button
                        className="text-white px-5 rounded-lgpx-5 py-2 border-none outline-none bg-blue-500 w-full rounded-lg"
                    >
                        Lon in
                    </button>
                </form>

                <p className="text-center text-white mt-10">Don't have an account? <span className="text-blue-500 cursor-pointer">Sign up</span></p>
            </section>
        </main>
    )
}

export default Login