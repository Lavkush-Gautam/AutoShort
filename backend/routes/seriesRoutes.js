import express from "express";
import {
  createSeries,
  getAllSeries,
  getSingleSeries,
  updateSeries,
  deleteSeries
} from "../controllers/seriesController.js";

const router = express.Router();

router.post("/create-series", createSeries);
router.get("/all-series", getAllSeries);
router.get("/series/:id", getSingleSeries);
router.put("/series-update/:id", updateSeries);
router.delete("/series-delete/:id", deleteSeries);

export default router;
