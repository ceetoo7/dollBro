import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // validation
    if (!name) {
      return res.status(400).send({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ success: false, message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ success: false, message: "Phone number is required" });
    }
    if (!address) {
      return res.status(400).send({ success: false, message: "Address is required" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered. Please login.",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};



//POST LOGIN
export const loginController = async(req,res)=>{
  try {
    const  {email,password} = req.body;
    //validation
    if(!email || !password){
      return res.status(404).send({
        success:false,
        message:"Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).send({
        success:false,
        message:"Email not registered",
      });
    }
    const match = await comparePassword(password, user.password)
    if(!match){
      return res.status(200).send({
        success:false,
        message:"Invalid Password",
      });
    }

    //token
    const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
      expiresIn :"7D",
    });
    res.status(200).send({
      success:true,
      message:"Login Successfully",
      user:{
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in login",
      error,
    })
  }
};


//test controller
export const testController = (req, res) => {
  res.send("Protected Route");
};