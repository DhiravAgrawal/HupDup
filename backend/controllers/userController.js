import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import 'dotenv/config';

// Import your Mongoose models
import User from '../models/userModel.js';  // Adjust the path to your User model

// Connect to MongoDB using Mongoose
// mongoose.connect(process.env.ATLASDB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("MongoDB connected"))
// .catch(err => console.error("MongoDB connection error:", err));

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users.length) {
            return res.status(400).json({ message: "No User Exists!" });
        }
        res.json(users);
    } catch (err) {
        console.error("Error while fetching users:", err.message);
        res.status(500).send("Server Error");
    }
};

const signUp = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            repositories: [],
            followedUsers: [],
            starRepos: []
        });

        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error("Error while signing up:", err.message);
        res.status(500).send("Server Error");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("Invalid Credentials!!");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid Credentials!!");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, userId: user._id });
    } catch (err) {
        console.error("Error while logging in:", err.message);
        res.status(500).send("Server Error");
    }
};

const getUserProfile = async (req, res) => {
    const currentID = req.params.id;
    try {
        const user = await User.findById(currentID);
        if (!user) {
            return res.status(400).json({ message: "No User Found!" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error while fetching user profile:", err.message);
        res.status(500).send("Server Error");
    }
};

const updateUserProfile = async (req, res) => {
    const currentID = req.params.id;
    const { email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(currentID)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
        let updateFields = { email };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            currentID,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "No User Found!" });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error("Error while updating user profile:", err.message);
        res.status(500).send("Server Error");
    }
};

const deleteUserProfile = async (req, res) => {
    const currentID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(currentID)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
        const user = await User.findByIdAndDelete(currentID);
        if (!user) {
            return res.status(400).json({ message: "No User Found!" });
        }
        res.json({ message: "User Profile Deleted" });
    } catch (err) {
        console.error("Error while deleting user profile:", err.message);
        res.status(500).send("Server Error");
    }
};

export { getAllUsers, signUp, login, getUserProfile, updateUserProfile, deleteUserProfile };
