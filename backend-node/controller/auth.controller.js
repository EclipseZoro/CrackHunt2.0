import { db } from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    console.log("Registering user");
    const { username, email, password } = req.body;
    console.log("Request body:", req.body);
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    console.log("Registering user1");

    const user =await db.user.findUnique({
        where: {
            email: email
        }
    });
    console.log("Register111ing user");

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    console.log("Registeri33333ng user");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });
    console.log("Registrtwetweering user");

    if (!newUser) {
        return res.status(500).json({ message: "Failed to create user" });
    }
    
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({
        message: "User created successfully",
        token
    });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    // Store refresh token in the database
    await db.user.update({
        where: { id: user.id },
        data: { refreshToken }
    });

    res.status(200).json({
        message: "User logged in successfully",
        username: user.username,
        refreshToken
    });
};
export const logoutUser = async (req, res) => {
    const { userId } = req;
    if (!userId) {
        return res.status(400).json({ message: "User not found" });
    }

    await db.user.update({
        where: { id: userId },
        data: { refreshToken: null }
    });

    res.status(200).json({ message: "User logged out successfully" });
};


export const refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(403).json({ message: "Refresh token required" });
    }

    // Find user by refresh token
    const user = await db.user.findFirst({ where: { refreshToken: token } });
    if (!user) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate new access token
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.status(200).json({ accessToken });
    });
};

