import * as dotenv from "dotenv";
dotenv.config();
import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET;

export const initialTokenCheck = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.sendStatus(204).json({
      message: "Token has not been found. Please sign in",
    });
  }

  const checkToken = token;

  jwt.verify(checkToken, secret, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden" });

    const foundLoggedInUser = await userModel
      .findOne({
        username: decoded.username,
      })
      .exec();

    if (!foundLoggedInUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const alreadyAccessedToken = jwt.sign(
      {
        UserInfo: {
          username: foundLoggedInUser,
          role: foundLoggedInUser,
          id: foundLoggedInUser,
        },
      },
      secret,
      { expiresIn: "1d" }
    );
    res.json({ accessToken: alreadyAccessedToken });
  });
};

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
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

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

  const isUserDuplicate = await userModel.findOne({ email });

  if (isUserDuplicate) {
    return res
      .status(409)
      .json({ message: "User already exists" });
  }

  if (!emailRegexp.test(email)) {
    return res
      .status(422)
      .json({ message: "email is not valid" });
  }

  if (username.length < 3) {
    return res.status(400).json({
      message: "Password must be at least 3 characters long",
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      message:
        "Password must have at least one uppercase and lowercase letter. Must have at least one digit and be at least 6 characters long",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if ((!role === "") | "Seeker" | "Poster" | "Admin") {
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
      .status(422)
      .json({ message: "Password is not correct" });
  }

  jwt.sign(
    {
      username: foundUser.username,
      role: foundUser.role,
      id: foundUser._id,
    },
    secret,
    {
      expiresIn: "3d",
    },
    async (err, token) => {
      if (err) return res.json({ message: "Forbidden" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken: token });
    }
  );
};

export const changePassword = async (req, res) => {
  const { token } = req.cookies;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden" });

    const user = await userModel.findOne({
      username: decoded.username,
    });

    if (!user) {
      return res
        .json(401)
        .json({ message: "User Unauthorized" });
    }

    if (!req.body.oldPassword || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Fill all required fields" });
    }

    const passwordIsCorrect = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    if (!passwordIsCorrect) {
      return res
        .status(422)
        .json({ message: "Password is not correct" });
    }

    const checkPassword = passwordRegex.test(req.body.password);
    if (!checkPassword) {
      return res.status(422).json({
        message:
          "Password must have at least one uppercase and lowercase letter. Must have at least one digit, one special character and be at least 6 characters long",
      });
    }

    user.password = req.body.password;

    await user.save();

    res.json({ message: "Password changed successfully" });
  });
};

export const refreshToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.sendStatus(204);

  jwt.verify(token, secret, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden" });

    const user = await userModel.findOne({
      username: decoded.username,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    jwt.sign(
      {
        username: user.username,
        role: user.role,
        id: user._id,
      },
      secret,
      { expiresIn: "1d" },
      async (err, token) => {
        if (err) return res.json({ message: "Forbidden" });
        res.json({ accessToken: token });
      }
    );
  });
};

export const logout = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.sendStatus(204);
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Logged out" });
};

export const updateUserBesidePassword = async (req, res) => {
  const { token } = req.cookies;
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden" });

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    const emailCheck = emailRegexp.test(req.body.email);
    if (!emailCheck) {
      return res
        .status(422)
        .json({ message: "email is not valid" });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: "Password must be at least 3 characters long",
      });
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastNameName;
    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;

    await user.save();

    res.json({ message: "Data changed successfully" });
  });
};
