import React, { useState, useRef, useEffect } from 'react';
import useUserStore from '../store/userStore';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function OTPcheck() {
    const navigate = useNavigate();
    const [otp, setOTP] = useState<string[]>(Array(4).fill(""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const method = useUserStore((state) => state.verifyUser);

    useEffect(() => {
        if (activeIndex !== null) {
            inputRefs.current[activeIndex]?.focus();
            setActiveIndex(null);
        }
    }, [activeIndex]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOTP(newOtp);

        if (value && index < otp.length - 1) {
            setActiveIndex(index + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = "";
                setOTP(newOtp);
            } else if (index > 0) {
                newOtp[index - 1] = "";
                setOTP(newOtp);
                setActiveIndex(index - 1);
            }
        }
    };

    const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const finalOtp = otp.join("");
        console.log(finalOtp);
        await method(finalOtp);
        navigate('/');
    };

    return (
        <main className="min-h-screen flex flex-row items-center justify-center bg-slate-800 font-primary text-white">
            <form
                onSubmit={handleSubmitEmail}
                className="px-20 py-10 rounded-lg bg-slate-500 w-[600px]"
            >
                <h1 className="text-4xl font-semibold mb-1">Verify Your Email by OTP</h1>
                <p className="mb-5 text-slate-300">We have sent an OTP to your email</p>

                <div className="flex justify-center mb-5">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el: HTMLInputElement | null) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-10 h-10 text-center mx-2 rounded-md bg-slate-400 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 w-full mt-5 py-2 rounded-md transition active:scale-95"
                >
                    Verify Email
                </button>
            </form>
            <Toaster />
        </main>
    );
}

export default OTPcheck;