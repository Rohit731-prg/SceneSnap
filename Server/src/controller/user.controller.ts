import { Request, Response } from "express"
import User from "../model/user.model";
import bcrypt from 'bcryptjs';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone, password, role } = req.body;
    if ( !name || !email || !phone || !password || !role )  {
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

        const newUser = new User({ name, email, phone, password: hashPass, role, otp });
        await newUser.save();

        // add nodemailer

        res.status(201).json({ message: 'User created successfully' });
        return;
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const verifyOTPAndJWT = async (req: Request, res: Response): Promise<void> => {
    
}

export const Login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if ( !email || !password )  {
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

        // JWT

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}