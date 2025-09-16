import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import authenticateToken from "../middleware/authenticateToken.js";
// import verifyAccount from "../controller/userController.js";

const router = express.Router();


router.get("/private", authenticateToken, (req, res) => {
  res.json({ message: "Private data", user: req.user });
});

// router.get("/verify/:token",verifyAccount, async (req, res) => {
//     try {
//         const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);

//         if (!user) return res.status(400).json({ message: "Invalid token" });

//         user.verified = true;
//         await user.save();

//         res.send("Email verified! You can now log in.");
//     } catch (error) {
//         res.status(400).json({ message: "Invalid or expired token" });
//     }
// });

export default router