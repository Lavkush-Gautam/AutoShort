import mongoose from "mongoose";
import Series from "../models/Series.js";

// Helper: Validate MongoDB ID
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Allowed fields to prevent mass assignment attack
const allowedFields = [
  "destination",
  "content",
  "narrationVoice",
  "artStyle",
  "aspectRatio",
  "videoLanguage",
  "durationPreference",
];

// Sanitize incoming data
const sanitizeData = (data) => {
  const sanitized = {};
  Object.keys(data).forEach((key) => {
    if (allowedFields.includes(key)) {
      sanitized[key] = typeof data[key] === "string"
        ? data[key].trim() // remove spaces
        : data[key];
    }
  });
  return sanitized;
};

// Create new series
export const createSeries = async (req, res) => {
  try {
    const body = sanitizeData(req.body);

    if (!body.destination || !body.content) {
      return res.status(400).json({
        success: false,
        msg: "Destination and content are required.",
      });
    }

    const series = await Series.create(body);

    return res.status(201).json({ success: true, data: series });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// Get all series
export const getAllSeries = async (req, res) => {
  try {
    const series = await Series.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: series });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// Get single series
export const getSingleSeries = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, msg: "Invalid ID format." });
    }

    const series = await Series.findById(id);

    if (!series) {
      return res.status(404).json({ success: false, msg: "Series not found." });
    }

    return res.json({ success: true, data: series });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// Update series
export const updateSeries = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, msg: "Invalid ID format." });
    }

    const updateData = sanitizeData(req.body);

    const updated = await Series.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // ensures schema rules apply
    });

    if (!updated) {
      return res.status(404).json({ success: false, msg: "Series not found." });
    }

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// Delete series
export const deleteSeries = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, msg: "Invalid ID format." });
    }

    const deleted = await Series.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Series not found." });
    }

    return res.json({ success: true, msg: "Series deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
