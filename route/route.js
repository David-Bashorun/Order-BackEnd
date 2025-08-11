import express from "express";
import multer from "multer";
import { signup, signin } from "../controller/userController.js";
import { fetchuser } from "../controller/userController.js";
import { orderFood } from "../controller/orderController.js";
import { fetchorders } from "../controller/orderController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { updateOrderStatus } from "../controller/orderController.js";
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

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/fetchuser", authenticateToken, fetchuser);
router.post("/orderfood", orderFood);
router.get("/fetchorders", fetchorders);
router.put("/order/:id", updateOrderStatus);

router.get("/meals", getMeals);
router.post("/meals", upload.single("image"), createMeal);
router.delete("/meals/:id", deleteMeal);

router.get("/private", authenticateToken, (req, res) => {
  res.json({ message: "Private data", user: req.user });
});





export default router;