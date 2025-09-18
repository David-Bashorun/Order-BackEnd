import express from "express";
import multer from "multer";

import nodemailer from "nodemailer";
import { signup , signin } from "../controller/userController.js";
import { fetchuser } from "../controller/userController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import {verifyAccount} from "../controller/userController.js";


const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // saves in uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique file name
  },
});

const upload = multer({ storage: storage });
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/fetchuser", authenticateToken, fetchuser);
router.get("/verify-email", verifyAccount);


export default router