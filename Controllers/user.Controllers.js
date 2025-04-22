import User from "../Models/login.Schema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User with this name or email already exists" });
    }

    // Hash the password
    const saltRounds = Number(process.env.SALTROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user object with hashed password
    const user = new User({ name, email, password: hashedPassword, role });
    const savedUser = await user.save();

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// this is the code block for signIn
export const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expiration time
      );
  
      // Respond with the token and user details (excluding password)
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.status(200).json({
        message: "Login successful",
        // user: userWithoutPassword,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  