import jwt from 'jsonwebtoken';
import User from '../Model/UserModel.js';

export const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
        const decode  = jwt.verify(token, process.env.JWT_CODE);
        if (!decode) return res.status(401).json({ message: "Invalid token" });
        const user = await User.findOne({ email: decode.email });
        if (!user || !user.isVerified) return res.status(401).json({ message: "User not found or not verified" });
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error while verifying token", error });
    }
}