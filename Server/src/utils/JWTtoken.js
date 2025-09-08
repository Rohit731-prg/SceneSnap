import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
    return (
        jwt.sign({ email: user.email }, process.env.JWT_CODE, { expiresIn: '24h' })
    )
}