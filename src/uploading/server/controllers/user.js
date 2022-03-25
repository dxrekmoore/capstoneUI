/*this is thee actual logic part for the function */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'soundMapper';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the existing users 
    const existingUser = await UserModal.findOne({ email });
    //check if user exists 
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
    //check if password is correct -- not string compare, the password the hashed 
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    //if the password is not correct 
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    //if everything is right: sign for the information 
    //the secret are the secret string variables 
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//add new users to database
export const signup = async (req, res) => {

  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    //find exiting users, avoding dupicate account 
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if (password != confirmPassword) return res.status(400).json({ message: "Password don't match" });

    //the second paramter is the level complexity for hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    //the final result
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};