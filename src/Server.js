import dotenv from "dotenv";
dotenv.config(); // load env variables first

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import routes from "./route/route.js";
import privroutes from "./route/PrivRoute.js";
import userroutes from "./route/UserRoute.js";
import orderroutes from "./route/OrderRoute.js";
import mealroutes from "./route/MealRoute.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // your Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// Set __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Serve uploads correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Body parser
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Connection Error", err));

// Routes
app.use("/api", routes);
app.use("/api", userroutes);
app.use("/api", orderroutes);
app.use("/api", mealroutes);
app.use("/api", privroutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello there, you're running on this server");
});

// PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
