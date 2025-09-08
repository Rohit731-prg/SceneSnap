import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/JWTtoken.js";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const isExist = await User.findOne({ email });
        if (isExist) return res.status(400).json({ message: "User already exists" });

        const hasedPassword = await bcrypt.hash(password, 10);
        const OTP = Math.floor(1000 + Math.random() * 9000).toString();

        const newUser = new User({
            username,
            email,
            password: hasedPassword,
            image: req.fileUrl || "",
            otp: OTP
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error while registering user", error });
    }
}

export const verifyUser = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
        user.isVerified = true;
        user.otp = null;
        await user.save();
        res.status(200).json({ message: "User verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error while verifying user", error });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Please provide email and password" });
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });
        if (!user.isVerified) return res.status(400).json({ message: "User not verified" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = await generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}