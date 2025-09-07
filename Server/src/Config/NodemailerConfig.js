import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});