import express from "express";
import {
  getAllUsers,
  getAllPlans,
  getAdminStats,
  getAnalytics,
  getAllSubscriptions,
} from "../controller/adminController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/plans", getAllPlans);
router.get("/stats", getAdminStats); 
router.get("/analytics", getAnalytics); 
router.get("/subscriptions", getAllSubscriptions);


export default router;

