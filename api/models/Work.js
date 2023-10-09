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
    location: {
      type: [String],
      required: true,
      enum: [
        "Remote",
        "Warsaw",
        "Kraków",
        "Łódź",
        "Wrocław",
        "Poznań",
        "Gdańsk",
        "Szczecin",
        "Bydgoszcz",
        "Lublin",
        "Białystok",
        "Katowice",
        "Gdynia",
        "Częstochowa",
        "Toruń",
      ],
    },
    applicants: {
      type: Map,
      of: Schema.Types.ObjectId,
      required: false,
    },
    salary: { type: Number, required: true },
    experience: { type: Number, required: true },
    skills: {
      type: [String],
      required: true,
      enum: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C++",
        "Ruby",
        "Golang",
        "Swift",
        "Kotlin",
        "PHP",
        "Rust",
        "C#",
        "TypeScript",
        "C",
        "SQL",
        "HTML/CSS",
        "Shell",
        "Assembly",
        "Clojure",
        "Kotlin",
        "Angular",
        "React",
        "React native",
        "Vue",
        ".Net",
        "Azure",
        "AWS",
        "ORACLE",
        "Ruby",
      ],
    },
    savedBy: [{ type: Schema.Types.ObjectId, required: false }],
    workingHours: {
      type: [String],
      required: true,
      enum: ["full-time", "part-time", "internship"],
    },

    contractType: {
      type: [String],
      required: true,
      enum: ["uop", "b2b", "uz", "uod"],
    },

    workType: {
      type: [String],
      required: true,
      enum: ["remote", "hybrid", "office"],
    },
  },
  { timestamps: true }
);

export default Model("Job", workModel);
