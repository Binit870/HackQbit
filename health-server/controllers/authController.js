import User from "../models/User.js";

<<<<<<< HEAD
import bycrypt from "bcryptjs";
=======
import bcrypt from "bcryptjs";
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
<<<<<<< HEAD
        const hashedPassword = await bycrypt.hash(password, 10);
=======
        const hashedPassword = await bcrypt.hash(password, 10);
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
        const newUser = new User({ name, username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
<<<<<<< HEAD
        const isPasswordCorrect = await bycrypt.compare(password, user.password);
=======
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
       
        res.status(200).json({ 
            token, 
            user: { 
                _id: user._id, 
                name: user.name, 
                username: user.username, 
                email: user.email,
<<<<<<< HEAD
                profileImageUrl: user.profileImageUrl
=======
                
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
            } 
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
