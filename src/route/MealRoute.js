import express from "express";
import multer from "multer";

import nodemailer from "nodemailer";
import { getMeals, createMeal, deleteMeal } from "../controller/mealController.js";

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

router.get("/meals", getMeals);
router.post("/meals", upload.single("image"), createMeal);
router.delete("/meals/:id", deleteMeal);


export default router