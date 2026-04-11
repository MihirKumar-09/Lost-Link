import express from "express";
import Report from "../models/reportSchema.js";
import isLoggedIn from "../middleware/isLogin.js";
const router = express.Router();

//! =========GET -> ALL REPORTS==========
router.get("/allReports", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 15;
    const { status, reportType } = req.query;

    let filter = {};

    // Status Filter
    if (status && status !== "all") {
      filter.status = status;
    }
    // Report type;
    if (reportType) {
      filter.reportType = reportType;
    }

    const allReports = await Report.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit);
    if (allReports.length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }
    return res.status(200).json({ message: "Get all reports", allReports });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch all reports" });
  }
});

//!=========GET SPECIFIC REPORT DETAILS=========
router.get("/lostItem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: "This report not found!" });
    }
    return res.status(200).json({ message: "Fetch successfully", report });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch report details", err });
  }
});

//!============DELETE THERE OWN REPORT==========
router.delete("/deleteReport/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(403).json({ message: "Report not found" });
    }

    // Owner check;
    if (report.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this report" });
    }

    await Report.findByIdAndDelete(id);

    return res.status(200).json({ message: "Report delete successfully" });
  } catch (err) {
    console.log("Delete Report Error : ", err);

    return res.status(500).json({ message: "Internal server error" });
  }
});

//!==========FETCH SPECIFIC USER REPORT==========
router.get("/my-reports", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;

    const totalReports = await Report.countDocuments({ userId });
    const totalLostReports = await Report.countDocuments({
      userId,
      reportType: "lost",
    });
    const totalFoundReports = await Report.countDocuments({
      userId,
      reportType: "found",
    });

    const reports = await Report.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      totalReports,
      totalLostReports,
      totalFoundReports,
      reports,
    });
  } catch (err) {
    console.log("Fetch my report error : ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//!==========UPDATE STATUS=============
router.patch("/updateStatus/:id", isLoggedIn, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status;
    if (!["open", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Owner check;
    if (report.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    report.status = status;
    await report.save();

    return res.json({ message: "Status Update", report });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
