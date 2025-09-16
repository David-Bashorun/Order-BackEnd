import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String, // 🖼️ store URL
});

export default mongoose.model("Meal", mealSchema);
