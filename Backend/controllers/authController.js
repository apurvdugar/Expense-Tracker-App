import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import cookieParser from "cookie-parser";

//Signup
export const signup = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    // Validate User Data
    if(!name || !email || !password){
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate Email
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({ message: "Email already exists" });
    }

    // Password length
    if(password.length < 6){
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Create User (password will be hashed by pre-save hook)
    const newUser = await User.create({ 
      name, 
      email, 
      password
    });
    
    const token = await genToken(newUser._id);
    
    res.cookie('token', token, { 
      httpOnly: true, 
      sameSite: 'Lax',
      maxAge: 30*24*60*60*1000 
    }); // 30 days

    res.status(201).json({ message: "User created successfully"});
  }
  catch(error){
    res.status(500).json({ message: "User signup failed. Server error!" });
  } 
}


//Signin
export const signin = async (req, res) => {
  try{
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ message: "User not found" });
    }

    // Check Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await genToken(user._id);
    
    res.cookie('token', token, { 
      httpOnly: true, 
      sameSite: 'Lax',
      maxAge: 30*24*60*60*1000 
    }); // 30 days

    res.status(200).json({ message: "Signin successful", token, user: { id: user._id, name: user.name, email: user.email }});

  }
  catch(error){
    res.status(500).json({ message: "User signin failed. Server error!" });
  } 
}

//Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed. Server error!" });
  }
}