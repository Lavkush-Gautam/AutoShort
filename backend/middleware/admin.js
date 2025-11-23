// middleware/adminAuth.js
import { requireSignIn } from "./auth.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    // `requireSignIn` will already set `req.user`
    await requireSignIn(req, res, async () => {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admins only.",
        });
      }
      next();
    });
  } catch (error) {
    console.error("Admin auth error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error in admin auth",
    });
  }
};
