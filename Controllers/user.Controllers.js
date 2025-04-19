import User from "../Models/login.Schema.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Hash the password
        const saltRounds = 10; // Adjust based on your security needs
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user object with hashed password
        const user = new User({ name, email, password: hashedPassword, role });
        const savedUser = await user.save();

        res.status(201).json({ savedUser });
    } catch (error) {
        res.status(400).json({ error });
    }
};