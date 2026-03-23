import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    image: {
      type: String,
      default: "",
      required: true,
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
    },
    dateTime: {
      // It store both data and time
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: {
      phone: Number,
      email: {
        type: String,
        required: true,
      },
    },
    reportType: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"], // This enum state show our report status ;
      default: "open",
    },
  },
  { timestamps: true },
);
const Report = new mongoose.model("Report", ReportSchema);
export default Report;
