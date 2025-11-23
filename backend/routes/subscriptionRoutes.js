import express from "express";
import { createPlan, deletePlan, getPlans, updatePlan } from "../controller/sunbscriptionController.js";

const router = express.Router();

// CREATE
router.post("/create-plan", createPlan);

// READ
router.get("/plans", getPlans);

// UPDATE
router.put("/update-plan/:id", updatePlan);

// DELETE
router.delete("/delete-plan/:id", deletePlan);

export default router;
