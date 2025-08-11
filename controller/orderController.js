import e from "express";
import Order from "../model/order.js";
import { sendEmail } from "../utils/sendEmail.js";

export const orderFood = async (req, res) => {
  try {
    const {
      customerName,
      foodItem,
      quantity,
      deliveryAddress,
      orderTime,
      status,
      userId,
      email
    } = req.body;

    // Validate foodItem
    if (!foodItem || !Array.isArray(foodItem) || foodItem.length === 0) {
      return res.status(400).json({ message: "foodItem is required and must be a non-empty array." });
    }

    // Convert array of food items to string for saving
    const foodItemsString = foodItem
      .map((item) => `${item.name} (x${item.quantity})`)
      .join(", ");

    // Create new order
    const newOrder = new Order({
  customerName,
  foodItem, // it's already an array
  deliveryAddress,
  orderTime,
  status,
  userId,
  email,
});


    // Save to database
    await newOrder.save();

    // Send confirmation email
    const message = `<table>
      <tbody>
        <tr>
          <td style="padding: 20px 30px 40px 30px;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
              <tbody>
                <tr>
                  <td style="padding: 5px 0 20px 10px; font-size: 18px; line-height: 24px;">
                    <strong>
                      <p style="font-size: 20px; line-height: 28px;">Hello ${customerName},</p>
                    </strong>
                    <p style="font-size: 14px; line-height: 24px;">
                      Congratulations on successfully ordering your meal. Find below the details of your order:
                    </p>
                    <ul style="font-size: 16px; line-height: 24px;">
                      <li>Reference number: ${userId}</li>
                      <li>Food Item(s): ${foodItemsString}</li>
                      <li>Quantity: ${quantity}</li>
                      <li>Your order will get to you soonest.</li>
                    </ul>
                    <strong style="font-size: 18px; line-height: 28px;">Enjoy your meal!</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>`;

    try {
      await sendEmail(email, "Order Confirmation", message);
    } catch (emailErr) {
      console.error("Error sending email:", emailErr);
    }

    return res.status(201).json({ success: true, message: "Order saved successfully" });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchorders = async (req, res) => {
  try {
    let users = await Order.find().select(
      "customerName foodItem quantity deliveryAddress orderTime status"
    );
    return res.status(200).json({ users });
  } catch {
    return res.status(500).json({ msg: "Error in Fetching Users" })
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ msg: "Order status updated", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};