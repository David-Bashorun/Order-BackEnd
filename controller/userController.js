//controller/usercontroller.mjs

import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import e from "express";
import { v4 as uuidv4 } from "uuid";


export const signup = async (req,res) => {
    try{
        const {Name, email, password} = req.body;
        console.log(Name, email, password);
        //check if the email is already registered

        const extinguisher = await User.findOne({email});
        if(extinguisher){
            return res.status(400).json({message:"Email already registered"});
        }
        
        //Hash the passsword
        const hashedPassword = await bcrypt.hash(password,10);

        //create a new user
        const newUser = new User ({
            userId: uuidv4(),
            Name: Name,
            email: email,
            password: hashedPassword,
        })


        await newUser.save();

        return res.status(201).json({message: "User registered ssuccesfully"})


    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "server error"})
        

    }


}

// export const signin = async (req,res) => {
//     try {
//         const {email, password} = req.body;
//         console.log(email,password);

//         //find the user by email
//         const user = await User.findOne({email});
//         if (!user){
//             return res.status(401).json({message:"Invalid Credentials"})

//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password)
//         if (!isPasswordValid){
//             return res.status(401).json ({message: "Invalid creentials"})
//         }
        
        
        
        
//         // generate token
//         const token = jwt.sign({userId: user._id}, 'JQULYSXL12345', {
//             expiresIn: "1h"
//         })

//         // return res.status(401).json ({message: "Login Successful" })
//         return res.status(200).json({token})

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:"Server Error"})
        
        
//     }
// }

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received:", email, password);

    // ✅ Static admin check
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { role: "admin" },
        "JQULYSXL12345",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "admin"
      });
    }

    // ✅ DB user check
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: "user" },
      "JQULYSXL12345",
      { expiresIn: "1h" }
    );

//     const token = jwt.sign(
//   { userId: user.userId, role: "user" },
//   "YOUR_SECRET_KEY",
//   { expiresIn: "1h" }
// );


    return res.status(200).json({
      message: "User login successful",
      token,
      userId: user._id,
      name: user.Name, // ✅ fix: use username
      email: user.email,
      role: "user"
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