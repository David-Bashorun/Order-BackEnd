import sendEmail from "./sendEmail";

import React from 'react'

const sendResetPassword = async ({Name, email, token, origin}) => {
    
 const resetUrl = `${origin}/user/reset-password?email=${email}token=${token}`;
 const message = `Please click on the following link to reset your password: <a href="${resetUrl}">Reset Password</a>`;

    await sendEmail({
        to: email,
        subject: "Password Reset Request",
        html:`hello ${Name}
        ${message}`
    })
}

export default sendResetPassword