import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const requireSignIn = async (req, res, next) => {
  try {
    //  1. Extract token safely from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token found.",
      });
    }

    //  2. Verify token with secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded._id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    //  3. Fetch user (without password)
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    //  4. Attach user info to request
    req.user = user;

    //  5. Proceed to next middleware or controller
    next();

  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
