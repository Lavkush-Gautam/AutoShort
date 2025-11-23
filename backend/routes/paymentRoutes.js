import express from "express";
import { createOrder, getAllPayments, getPaymentHistory, verifyPayment } from "../controller/paymentController.js";
import { requireSignIn } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-order", requireSignIn, createOrder);
router.post("/verify", requireSignIn, verifyPayment);
router.get("/payment-history", requireSignIn,getPaymentHistory);
router.get("/all", requireSignIn, getAllPayments);

export default router;
