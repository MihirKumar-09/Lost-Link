import express from "express";
import Report from "../models/reportSchema.js";
import upload from "../middleware/multer.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const router = express.Router();

router.post("/newFoundReport", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      category,
      color,
      model,
      city,
      area,
      dateTime,
      description,
      phone,
      email,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!category?.trim()) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!color?.trim()) {
      return res.status(400).json({ message: "Color is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!city?.trim()) {
      return res.status(400).json({ message: "City is required" });
    }

    if (!area?.trim()) {
      return res.status(400).json({ message: "Area is required" });
    }

    if (!dateTime) {
      return res.status(400).json({ message: "Date and time is required" });
    }

    const parsedDate = new Date(dateTime);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid dateTime format" });
    }

    if (!description?.trim()) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (!email?.trim()) {
      return res.status(400).json({ message: "Contact email is required" });
    }
    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "found_report",
    );
    const newFoundReport = new Report({
      name: name.trim(),
      category: category.trim(),
      color: color.trim(),
      model: model.trim() || "",
      image: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
      location: {
        city: city.trim(),
        area: area.trim(),
      },
      dateTime: parsedDate,
      description: description.trim(),
      contact: {
        phone: phone?.toString().trim() || "",
        email: email.trim().toLowerCase(),
      },
      reportType: "found",
      status: "open",
    });

    const saveReport = await newFoundReport.save();

    return res.status(201).json({
      message: "Found report created successfully",
      report: saveReport,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "failed to create new found report",
      error: err.message,
    });
  }
});

export default router;
