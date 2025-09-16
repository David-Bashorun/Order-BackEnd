import sendEmail from "./sendEmail.js"
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const sendVerificationEmail = async({Name, email, verificationToken, origin}) => {
  
    const verifyEmail = `${origin}/api/verify-email?email=${email}&token=${verificationToken}`;

    const message = `<p>please click on the following link to verify email: <a href="${verifyEmail}">click here</a> </p>`

    return sendEmail({
        to: email,
        subject: 'Email Confirmation',
        html: `<h1>hello ${Name}</h1>
        ${message}
        `
    })

}

export default sendVerificationEmail