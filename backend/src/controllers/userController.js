const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret Key (بعدها نحطوها في .env)
const JWT_SECRET = "shoppingbyamal";

// ==============================
// REGISTER
// ==============================
async function register(req, res) {

    try {

        const {
            fullName,
            email,
            password,
            role
        } = req.body;

        // Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Check Email
        const existingUser = await User.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save User
        const newUser = await User.createUser({
            fullName,
            email,
            password: hashedPassword,
            role
        });

        // Generate Token
        const token = jwt.sign(
            {
                id: newUser.id,
                role: newUser.role
            },
            JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token,
            user: newUser
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Register failed."
        });

    }

}

// ==============================
// LOGIN
// ==============================
async function login(req, res) {

    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        // Find User
        const user = await User.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed."
        });

    }

}

module.exports = {
    register,
    login
};