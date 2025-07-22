import { Request, Response } from "express"
import User from "../model/user.model";
import bcrypt from 'bcryptjs';
import { sendmail } from "../lib/nodemailer";
import JWT from 'jsonwebtoken';
import cloudinary from "../config/cloudinary";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone, password, role, image } = req.body;
    if (!name || !email || !phone || !password || !role || !image) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const hashPass = await bcrypt.hash(password, 10);
        const otp = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        const imageDetails = await cloudinary.uploader.upload(image, { public_id: email, resource_type: 'image' });
        const userImage = imageDetails.secure_url;

        const newUser = new User({ name, email, phone, password: hashPass, role, otp, image: userImage, public_key: imageDetails.public_id });
        await newUser.save();

        const subject = 'Verification code';
        const text = `Your verification code is: ${otp}`;

        await sendmail(email, subject, text);

        res.status(201).json({ message: 'User created successfully' });
        return;
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const verifyOTPAndJWT = async (req: Request, res: Response): Promise<void> => {
    const { email, SendOtp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (user.otp !== SendOtp) {
            res.status(401).json({ message: 'Invalid OTP' });
            return;
        }
        user.auth = true;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const Login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isMatchPass = await bcrypt.compare(password, user.password);
        if (!isMatchPass) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        if (user.verified === false || user.auth === false) {
            res.status(401).json({ message: 'User not verified' });
            return;
        }

        const token = JWT.sign({ id: user._id, email: user.email }, process.env.JWT_CODE as string, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // ✅ for localhost (HTTP)
            sameSite: "lax", // ✅ 'lax' works for different ports on same domain
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getALLUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({ auth: true });
        const count = await User.countDocuments({ auth: true });

        res.status(200).json({ users, count });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}