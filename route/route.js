import express from "express";
import multer from "multer";

import bcrypt from "bcrypt";
import nodemailer from "nodemailer";





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





// router.post("/signup", signup);
// router.post("/signin", signin);
// router.get("/fetchuser", authenticateToken, fetchuser);
// router.post("/orderfood", orderFood);
// router.get("/fetchorders", fetchorders);
// router.put("/order/:id", updateOrderStatus);

// router.get("/meals", getMeals);
// router.post("/meals", upload.single("image"), createMeal);
// router.delete("/meals/:id", deleteMeal);

// router.get("/private", authenticateToken, (req, res) => {
//   res.json({ message: "Private data", user: req.user });
// });
// router.get("/verify/:token", async (req, res) => {
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






export default router;