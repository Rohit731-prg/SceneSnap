import nodemailer from 'nodemailer';

export const sendmail = async (to: string, subject: string, text: string) => {
    try {
        const transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOption = {
            from: `"SCENESNAP Verification" <${process.env.EMAIL}>`,
            to,
            subject,
            text,
            html: `<h1>This is form SCENESNAP</h1>
            <p>${text}</p>`,

        };

        const info = await transpoter.sendMail(mailOption);
        console.log("Email sent: " + info.response);

    } catch (error) {
        console.log('Error from nodemailer : ', error);
    }
}