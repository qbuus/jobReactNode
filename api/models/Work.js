import { Schema, Model } from "mongoose";

const workModel = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    company: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    position: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    location: [{ type: String, required: true }],
    applicants: {
      type: Map,
      of: Schema.Types.ObjectId,
      required: false,
    },
    salary: { type: Number, required: false },
    expiresAt: { type: Date, required: false },
    experience: { type: Number, required: true },
    skills: [{ type: String, required: true }],
    savedBy: [{ type: Schema.Types.ObjectId, required: false }],
    workingHours: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "internship"],
    },
    workType: {
      type: String,
      required: true,
      enum: ["uop", "b2b", "uz", "uod"],
    },
  },
  { timestamps: true }
);

export default Model("Job", workModel);
