import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import University from "../models/University.js";

export async function register(req, res) {

    try {

        const {
            name,
            email,
            password,
            wallet
        } = req.body;

        console.log("===== REGISTER REQUEST =====");
        console.log(req.body);

        // Validate input
        if (!name || !email || !password || !wallet) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        // Check existing email
        const existingEmail = await University.findOne({
            email
        });

        if (existingEmail) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        // Check existing wallet
        const existingWallet = await University.findOne({
            wallet
        });

        if (existingWallet) {

            return res.status(400).json({
                message: "Wallet already registered"
            });

        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Save university
        const university = await University.create({

            name,

            email,

            password: hashedPassword,

            wallet

        });

        console.log("===== REGISTER SUCCESS =====");
        console.log(university);

        return res.status(201).json({

            success: true,

            message: "University registered successfully",

            university: {

                id: university._id,

                name: university.name,

                email: university.email,

                wallet: university.wallet

            }

        });

    }
    catch (error) {

        console.error("REGISTER ERROR:");
        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Registration failed",

            error: error.message

        });

    }

}

export async function login(req, res) {

    try {

        const {
            email,
            password
        } = req.body;

        console.log("===== LOGIN REQUEST =====");
        console.log(req.body);

        // Find university
        const university = await University.findOne({
            email
        });

        if (!university) {

            return res.status(404).json({

                success: false,

                message: "University not found"

            });

        }

        // Check password
        const validPassword = await bcrypt.compare(

            password,

            university.password

        );

        if (!validPassword) {

            return res.status(401).json({

                success: false,

                message: "Invalid password"

            });

        }

        // Generate JWT
        const token = jwt.sign(

            {

                id: university._id,

                email: university.email,

                wallet: university.wallet

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        console.log("===== LOGIN SUCCESS =====");
        console.log(university.email);

        return res.json({

            success: true,

            message: "Login successful",

            token,

            university: {

                id: university._id,

                name: university.name,

                email: university.email,

                wallet: university.wallet

            }

        });

    }
    catch (error) {

        console.error("LOGIN ERROR:");
        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Login failed",

            error: error.message

        });

    }

}