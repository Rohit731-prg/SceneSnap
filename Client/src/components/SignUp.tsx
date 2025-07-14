import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
    const image = 'https://img.freepik.com/premium-photo/dark-room-with-camera-lights_248459-63285.jpg'
    const [showPass, setShowPass] = useState<Boolean>(true)
    return (
        <main className="bg-slate-800 py-10 px-80 font-primary">
            <img src={image} alt="" className="w-full h-96 object-cover rounded-lg" />

            <section className="my-10">
                <p className="text-center text-white font-semibold text-4xl">Sign up for ScenesNap</p>
                <form className="flex flex-col gap-4 items-center justify-center w-full px-96 mt-10">
                    <input 
                    placeholder="Full Name"
                    className="px-5 py-2 border-none outline-none bg-slate-500 w-full rounded-lg"
                    type="text" />

                    <input 
                    placeholder="Enter Email Address"
                    className="px-5 py-2 border-none outline-none bg-slate-500 w-full rounded-lg"
                    type="email" />

                    <input 
                    placeholder="Enter Phone Number"
                    className="px-5 py-2 border-none outline-none bg-slate-500 w-full rounded-lg"
                    type="tel" />

                    <div className="flex items-center justify-between px-5 py-2 border-none outline-none bg-slate-500 w-full rounded-lg">
                        <input 
                        className="w-full border-none outline-none"
                        placeholder="Enter Password"
                        type={showPass ? "text" : "password"} />
                        <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between px-5 py-2 border-none outline-none bg-slate-500 w-full rounded-lg">
                        <input 
                        className="w-full border-none outline-none"
                        placeholder="Enter Confirm Password"
                        type={showPass ? "text" : "password"} />
                        <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <button
                    className="px-5 py-2 border-none outline-none bg-blue-500 w-full rounded-lg"
                    type="submit"
                    >
                        Submit Details
                    </button>
                </form>

                <p className="text-center mt-5 text-white ">
                    Already have an account? <a href="#" className="text-blue-500">Login</a>
                </p>
            </section>
        </main>
    )
}

export default SignUp