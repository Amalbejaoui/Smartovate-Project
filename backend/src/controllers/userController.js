const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const existingUser = await User.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.createUser({

            fullName,
            email,
            password: hashedPassword,
            role

        });

        const token = jwt.sign(

            {
                id: newUser.id,
                role: newUser.role
            },

            process.env.JWT_SECRET,

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

        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Email and password are required."

            });

        }

        const user = await User.findUserByEmail(email);

        if (!user) {

            return res.status(401).json({

                success: false,
                message: "Invalid email or password."

            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid email or password."

            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                role: user.role
            },

            process.env.JWT_SECRET,

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