import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./route/route.js";
import privroutes from "./route/PrivRoute.js";
import userroutes from "./route/UserRoute.js";
import orderroutes from "./route/OrderRoute.js";
import mealroutes from "./route/MealRoute.js";
import bodyParser from "body-parser";
const app = express();

//middleware
app.use(cors());
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb"}))
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/uploads", express.static("uploads"));

//DB connection

mongoose.set("strictQuery", false);
mongoose
    .connect(
        "mongodb+srv://davidbashorun:ADo01A6MVGgXPgrK@cluster0.80qqyft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    )
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Connection Error", err));

dotenv.config()


app.use(cors())

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Hello there, you're running on this server");
})

app.use("/api" , routes)
app.use("/api", userroutes)
app.use("/api", orderroutes)
app.use("/api", mealroutes)
app.use("/api", privroutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

