import express from "express";
import { requireSignIn } from "../middleware/auth.js";
import { profileController,registerController,loginController,updateProfileController, changePasswordController, logoutController, userPaymentsController, getUserDashboard } from "../controller/userController.js";

const router = express.Router();

// Register and login
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", requireSignIn,profileController);
router.post("/logout",requireSignIn,logoutController);
router.put("/update-profile/:id", requireSignIn, updateProfileController);
router.put("/change-password/:id", requireSignIn, changePasswordController);
router.get('/payments/user-payments',requireSignIn, userPaymentsController);
router.get('/dashboard', requireSignIn,getUserDashboard); 



export default router;
