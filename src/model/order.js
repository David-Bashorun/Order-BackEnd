import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  foodItem: [
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
  }
],

  
  deliveryAddress: {
    type: String,
    required: true,
  },
  orderTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
