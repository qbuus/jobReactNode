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
  const pageSize = 10;
  const page = Number(req.query.pageNumber);

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

    const count = await offerModel
      .find({ owner: decoded.id })
      .estimatedDocumentCount();

    const userOffers = await offerModel
      .find({
        owner: decoded.id,
      })
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    if (userOffers.length === 0) {
      return res.status(200).json({
        message: "You have not created any offers yet",
        count: 0,
      });
    }

    return res.status(200).json({
      userOffers,
      message: `${userOffers.length} Offers found`,
      pages: Math.ceil(count / pageSize),
      count: count,
      currentPage: page,
    });
  });
};

export const editOffer = (req, res) => {
  const {
    id,
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
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden" });

    const foundUser = await userModel.findById(decoded.id);
    const foundOffer = await offerModel.findOne({
      owner: decoded.id,
    });

    if (!foundOffer) {
      return res.status(404).json({
        message: "You are not the owner of this offer",
      });
    }

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
      return res.status(400).json({
        message: "All these fields are required",
      });
    }

    const offerToEdit = await offerModel.findById(id);

    if (!offerToEdit) {
      return res
        .status(404)
        .json({ message: "offer is not valid" });
    }

    (offerToEdit.company = company),
      (offerToEdit.title = title),
      (offerToEdit.position = position),
      (offerToEdit.description = description),
      (offerToEdit.location = location),
      (offerToEdit.salary = salary),
      (offerToEdit.experience = experience),
      (offerToEdit.skills = skills),
      (offerToEdit.workingHours = workingHours),
      (offerToEdit.contractType = contractType),
      (offerToEdit.workType = workType),
      await offerToEdit.save();

    return res.status(200).json({
      message: `Offer ${id} has been edited successfully`,
    });
  });
};

export const deleteOffer = (req, res) => {
  const { token } = req.cookies;
  const { id } = req.body;

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden" });

    const foundUser = await userModel.findById(decoded.id);
    const foundOffer = await offerModel.findById(id);

    if (foundUser.role !== "Recruiter") {
      return res.status(403).json({
        message:
          "This account does not have permission to do this action",
      });
    }

    if (
      foundOffer.owner.toString() !== foundUser._id.toString()
    ) {
      return res.status(401).json({
        message: "This user is not an owner of this offer",
      });
    }

    await offerModel.deleteOne(foundOffer);

    return res.status(200).json({
      message: `Offer ${foundOffer._id} deleted`,
      status: 200,
    });
  });
};

export const latestOffers = async (req, res) => {
  const pageSize = 5;

  const LatestOffers = await offerModel
    .find({})
    .sort({ createdAt: -1 })
    .select("-_id -owner -applicants -savedBy")
    .limit(pageSize);

  if (!LatestOffers) {
    return res.status(404).json({
      message: "Latest offers not found",
      status: 404,
    });
  }

  return res.status(200).json({
    message: "Top 5 latest offers",
    status: 200,
    data: LatestOffers,
    count: pageSize,
  });
};

export const highlightedOffers = async (req, res) => {
  const pageSize = 5;

  const HighlightedOffers = await offerModel
    .find({})
    .where("experience")
    .gt(4)
    .sort({ createdAt: -1 })
    .select("-_id -owner -applicants -savedBy")
    .limit(pageSize);

  if (!HighlightedOffers) {
    return res.status(404).json({
      message: "HighlightedOffers not found",
      status: 404,
    });
  }

  return res.status(200).json({
    message: "Top 5 highlighted offers",
    status: 200,
    data: HighlightedOffers,
    count: pageSize,
  });
};

export const AllOffers = async (req, res) => {
  const pageSize = 10;
  const page = parseInt(req.query.pageNumber) || 1;
  const skill = req.query.skill
    ? { skills: req.query.skill.toString() }
    : {};

  const allOffers = await offerModel
    .find({ ...skill })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const count = allOffers.length;

  if (allOffers.length === 0) {
    return res.status(200).json({
      message: "No job openings found",
      count: 0,
    });
  }

  return res.status(200).json({
    allOffers,
    message: `${allOffers.length} Offers found`,
    pages: Math.ceil(count / pageSize),
    count: count,
    currentPage: page,
  });
};
