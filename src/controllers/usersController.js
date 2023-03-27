import UsersModel from "../models/users.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, ext) => {
    try {
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);


        const newUser = new UsersModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully.", data: newUser });
    } catch (error) {

        console.error(error);

        if (error.code === 11000) {
            res.status(400).json({ message: "Email already exists." });
        } else {
            res.status(500).json({ message: "Server error." });
        }
    }
}

export const userLogin = async (req, res, ext) => {
    try {
        const user = await UsersModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password." });
        }


        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
        });


        res.status(200).json({ message: "Logged in successfully.", token: token });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
}