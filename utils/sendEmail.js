import nodemailer from "nodemailer";





export const sendEmail = async (email, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            html: text,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return { message: "Email sent" };
    } catch (error) {
        console.error("Error sending email:", error .message);
        throw new Error("Email not sent");
    }
};

export default sendEmail;

// import nodemailer from "nodemailer";
// import dotenv from "dotenv";


// dotenv.config();

// console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
// console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
// console.log("EMAIL_USER:", process.env.EMAIL_USER);

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,       // false for STARTTLS (port 587)
//   requireTLS: true,    // force TLS
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export default async function sendEmail({ to, subject, html }) {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent:", info.response);
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     throw new Error("Email not sent");
//   }
// }
