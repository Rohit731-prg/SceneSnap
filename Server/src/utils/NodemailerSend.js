import { transport } from "../Config/NodemailerConfig.js";

export const sendEmail = async (to, subject, text) => {
    try {
        const info = await transport.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text
        });
        console.log("Email sent: ", info.response);
        return info;
    } catch (error) {
        console.log("Error while sending email", error);
    }
}