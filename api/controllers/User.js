import * as dotenv from "dotenv";
dotenv.config();
import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET;

export const createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    role,
  } = req.body;

  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

  if (
    !firstName ||
    !lastName ||
    !username ||
    !password ||
    !email
  ) {
    return res
      .status(400)
      .json({ message: "All these field are required" });
  }

  if (!emailRegexp.test(email)) {
    return res
      .status(422)
      .json({ message: "email is not valid" });
  }

  if (username.length < 3) {
    return res.status(400).json({
      message: "Password must be at least 4 characters long",
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      message:
        "Password must have at least one uppercase and lowercase letter. Must have at least one digit, one special character and be at least 6 characters long",
    });
  }

  const isUserDuplicate = await userModel.findOne({ username });

  if (isUserDuplicate) {
    return res
      .status(409)
      .json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (((!role === "") | "Seeker" | "Poster", "Admin")) {
    return res.status(422).json({ meesage: "Role is invalid" });
  }

  const newUser = await userModel.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    role,
  });

  if (newUser) {
    res
      .status(201)
      .json({ message: `New user ${username} created` });
  } else {
    res
      .status(400)
      .json({ message: "Invalid user data received" });
  }
};

export const getAllUser = async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await userModel
    .find({})
    .estimatedDocumentCount();

  const users = await userModel
    .find()
    .sort({ createdAt: -1 })
    .select("-password")
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  if (!users?.length) {
    return res.status(404).json({ message: "No users found" });
  }

  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "All these field are required" });
  }

  const foundUser = await userModel
    .findOne({
      username: username,
    })
    .exec();

  if (!foundUser) {
    return res
      .status(404)
      .json({ message: "User does not exist" });
  }

  const PassMatch = await bcrypt.compare(
    password,
    foundUser.password
  );

  if (!PassMatch) {
    return res
      .status(401)
      .json({ message: "Password is not correct" });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        role: foundUser.role,
        id: foundUser._id,
      },
    },
    secret,
    {
      expiresIn: "1d",
    }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    secret,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

export const changePassword = async (req, res) => {
  const user = await userModel.findById();
};
