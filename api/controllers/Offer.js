import * as dotenv from "dotenv";
dotenv.config();
import workModel from "../models/Work.js";
import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import offerModel from "../models/Work.js";

const secret = process.env.TOKEN_SECRET;

export const createNewOffer = async (req, res) => {
  const { token } = req.cookies;
  const {
    company,
    title,
    position,
    description,
    location,
    salary,
    experience,
    skills,
    workingHours,
    contractType,
    workType,
  } = req.body;

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const foundUser = await userModel.findById(decoded.id);

    if (foundUser.role !== "Recruiter") {
      return res.status(403).json({
        message:
          "This account does not have permission to view this",
      });
    }

    if (
      !company ||
      !title ||
      !position ||
      !description ||
      !location ||
      !salary ||
      !experience ||
      !skills ||
      !workingHours ||
      !contractType ||
      !workType
    ) {
      return res
        .status(400)
        .json({ message: "All these fields are required" });
    }

    const newOffer = await workModel.create({
      owner: decoded.id,
      company: company,
      title: title,
      position: position,
      description: description,
      location: location,
      salary: salary,
      experience: experience,
      skills: skills,
      workingHours: workingHours,
      contractType: contractType,
      workType: workType,
    });

    if (newOffer) {
      return res.status(201).json({
        message:
          "New offer created. It will be seen on the main page",
      });
    } else {
      return res.status(400).json({
        message:
          "Invalid offer data received. Check the fields one more time",
      });
    }
  });
};

export const UserOffers = async (req, res) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const foundUser = await userModel.findById(decoded.id);

    if (foundUser.role !== "Recruiter") {
      return res.status(403).json({
        message:
          "This account does not have permission to view this",
      });
    }

    const userOffers = await offerModel.find({
      owner: decoded.id,
    });

    if (!userOffers) {
      return res.status(200).json({
        message: "You have not created any offers yet",
      });
    }

    return res.status(200).json({
      userOffers,
      message: `${userOffers.length} Offers found`,
    });
  });
};
