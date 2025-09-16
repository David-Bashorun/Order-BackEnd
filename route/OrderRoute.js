import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { orderFood } from "../controller/orderController.js";
import { fetchorders } from "../controller/orderController.js";
import { updateOrderStatus } from "../controller/orderController.js";


const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // saves in uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique file name
  },
});

router.post("/orderfood", orderFood);
router.get("/fetchorders", fetchorders);
router.put("/order/:id", updateOrderStatus);


export default router