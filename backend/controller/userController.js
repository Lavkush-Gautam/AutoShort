import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { hashPassword, comparePassword } from '../config/helper.js';
import Payment from '../models/paymentModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ No token creation, no cookie set
    res.status(201).send({
      success: true,
      message: "User registered successfully. Please log in to continue.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password",
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check password
        
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "7d" }
        );

        // Store token in httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // use true in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Send response
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                _id: user._id,
            },
            token, // optional
        });

    } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error: error.message,
        });
    }
};


export const profileController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "User profile fetched successfully",
            user,
        });
    }
    catch (error) {
        console.error("Error in profileController:", error);
        res.status(500).send({
            success: false,
            message: "Error fetching profile",
            error: error.message,
        });
    }
};

export const updateProfileController = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      email
    } = req.body;

    // Validate: avoid email conflicts
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use by another account",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(name && { name }),
          ...(email && { email })
        },
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfileController:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};


export const changePasswordController = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Both current and new passwords are required",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await comparePassword(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Current password is incorrect",
            });
        }

        const isSamePassword = await comparePassword(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).send({
                success: false,
                message: "New password cannot be the same as the old password",
            });
        }

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(newPassword)) {
            return res.status(400).send({
                success: false,
                message:
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
            });
        }

        const hashedNewPassword = await hashPassword(newPassword);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error("Error in changePasswordController:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error while changing password",
        });
    }
};
export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).send({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Error in logoutController:", error);
        res.status(500).send({
            success: false,
            message: "Error during logout",
            error: error.message,
        });
    }
};
export const userPaymentsController = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all payments for this user (sorted newest first)
    const payments = await Payment.find({ user: userId })
      .sort({ createdAt: -1 });

    if (!payments.length) {
      return res.status(404).json({ message: "No payments found" });
    }

    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

export const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      totalVideos: user.videosGenerated,
      planName: user.subscription?.planName || "Free",
      planType: user.subscription?.planType || "N/A",
      status: user.subscription?.status || "Inactive",
      expiryDate: user.subscription?.endDate || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user dashboard" });
  }
};





