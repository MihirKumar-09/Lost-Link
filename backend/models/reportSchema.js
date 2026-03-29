import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      area: {
        type: String,
        required: true,
        trim: true,
      },
    },
    dateTime: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      phone: {
        type: String,
        trim: true,
        default: "",
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
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
