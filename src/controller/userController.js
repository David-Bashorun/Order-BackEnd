//controller/usercontroller.mjs

import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { v4 as uuidv4 } from "uuid";

import sendVerificationEmail from "../utils/sendVerificationEmail.js";


export const signup = async (req, res) => {
  try {
    const { Name, email, password } = req.body;

    // check if email already exists
    const extinguisher = await User.findOne({ email });
    if (extinguisher) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create verification token
    const verificationToken = uuidv4();

    // create user with token
    const newUser = new User({
      Name,
      email,
      password: hashedPassword,
      verificationToken,    // ✅ store token
    });

    const origin = "http://localhost:4000"; // frontend
    const verifyEmail = `${origin}/user/verify-email?email=${email}&token=${verificationToken}`;

    // send verification email
    await sendVerificationEmail({
      Name: newUser.Name,
      email: newUser.email,
      verificationToken,
      origin,
    });

    await newUser.save();
    res
      .status(200)
      .json({ message: "Signup successful! Check your email for verification." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// export const verifyAccount = async (req, res) => {

//   const { verificationToken, email } = req.query;

//   const user = await User.findOne({ email })

//   if (!user) {
//     return res.status(401).json({ msg: "Invalid credentials" });
//   }

//   if (!user.verificationToken || user.verificationToken !== verificationToken) {
//     return res.status(401).json({ msg: "Invalid or expired token" });
//   }
//   user.isVerified = true;
//   user.verified = Date.now()
//   user.verificationToken = ''

//   await user.save()

//   res.status(StatusCodes.OK).json({ msg: 'success account verifield' })

// }

export const verifyAccount = async (req, res) => {
  try {
    const { email, token } = req.query;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (user.verificationToken !== token) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    user.isVerified = true;
    user.verifiedAt = Date.now();
    user.verificationToken = "";

    await user.save();
    res.status(200).json({ msg: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};




export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Static admin login
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "admin",
      });
    }

    // ✅ Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    // ✅ Create JWT
    const tokenUser = { userId: user._id, email: user.email, name: user.Name };
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Return only once
    return res.status(200).json({
      message: "User login successful",
      token,
      user: tokenUser,
      role: "user",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



export const fetchuser = async (req, res) => {
  try {
    let users = await User.find().select("Name email");
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error in Fetching Users" });
  }








} 