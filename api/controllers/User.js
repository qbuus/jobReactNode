import * as dotenv from "dotenv";
dotenv.config();
import userModel from "../models/User.js";
import tokenUser from "../models/Token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

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
        email: decoded.email,
      })
      .exec();

    if (!foundLoggedInUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const alreadyAccessedToken = jwt.sign(
      {
        UserInfo: {
          email: foundLoggedInUser.email,
          role: foundLoggedInUser.role,
          id: foundLoggedInUser._id,
        },
      },
      secret,
      { expiresIn: "1d" }
    );
    res.json({ accessToken: alreadyAccessedToken });
  });
};

export const createUser = async (req, res, next) => {
  const { firstName, lastName, password, email, role } =
    req.body;

  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,14}$/;

  if (!firstName || !lastName || !password || !email) {
    return res
      .status(400)
      .json({ message: "All these fields are required" });
  }

  const isUserDuplicate = await userModel.findOne({ email });

  if (isUserDuplicate) {
    return res
      .status(409)
      .json({ message: "Email already exists" });
  }

  if (!emailRegexp.test(email)) {
    return res
      .status(422)
      .json({ message: "email is not valid" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      message:
        "Password must be between 6 and 14 characters long. Must have at least 1 uppercase, 1 lowercase, 1 number [0-9]",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if ((!role === "") | "Seeker" | "Poster" | "Admin") {
    return res.status(422).json({ meesage: "Role is invalid" });
  }

  const newUser = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  if (newUser) {
    return res.status(201).json({
      message: "New user created. You can now sign in",
    });
  } else {
    return res.status(400).json({
      message:
        "Invalid user data received. Check the fields one more time",
    });
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
  const { token } = req.cookies;
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "All these fields are required" });
  }

  const foundUser = await userModel
    .findOne({
      email: email,
    })
    .exec();

  if (!foundUser) {
    return res
      .status(404)
      .json({ message: "Email does not exist" });
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

  if (token) {
    return res.status(422).json({
      message: "You can have one account signed in at once",
    });
  }

  if (!token) {
    jwt.sign(
      {
        role: foundUser.role,
        id: foundUser._id,
      },
      secret,
      {
        expiresIn: "1d",
      },
      async (err, token) => {
        if (err)
          return (
            res.status(403), json({ message: "Forbidden" })
          );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken: token });
      }
    );
  }
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
      _id: decoded.id,
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

  if (!token) {
    return res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  }

  if (token) {
    jwt.verify(token, secret, async (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Forbidden" });

      const user = await userModel.findById(decoded.id);

      if (!user) {
        return res
          .status(200)
          .json({ message: "User not found" });
      }

      jwt.sign(
        {
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
  }
};

export const logout = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(204);
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

    if (
      (!req.body.role === "") |
      "Seeker" |
      "Poster" |
      "Admin"
    ) {
      return res
        .status(422)
        .json({ meesage: "Role is invalid" });
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.role = req.body.role;

    await user.save();

    res.json({ message: "Data changed successfully" });
  });
};

export const getSingleUser = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const foundUser = await userModel
      .findById(decoded.id)
      .select(
        "-password -_id -__v -active -isLoggedIn -createdAt -updatedAt"
      );

    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    res.json(foundUser);
  });
};

export const forgetPassword = async (req, res) => {
  const { receiver } = req.body;

  const existingEmail = await userModel.findOne({
    email: receiver,
  });

  if (!existingEmail) {
    return res.status(404).json({
      message:
        "User does not exist. Please use correct email address",
    });
  }

  if (existingEmail) {
    const existingToken = await tokenUser.findOne({
      userId: existingEmail._id,
    });

    if (existingToken) {
      await existingToken.deleteOne();
    }

    await tokenUser.create({
      userId: existingEmail._id,
      createdAt: Date.now(),
      expireAt: new Date(),
    });

    sendEmail({
      receiver: existingEmail.email,
      OTP: req.body.OTP,
    })
      .then(() =>
        res.json({
          message: "Check your email to get access code",
        })
      )
      .catch((error) =>
        res.status(500).json({
          message: "There was an error sending your email",
        })
      );
  }
};

export const changePasswordAfterOTP = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,14}$/;

  const existingUser = await userModel.findOne({
    email: email,
  });

  if (!existingUser) {
    return res
      .status(404)
      .json("There was an error. User not found");
  }

  if (existingUser) {
    const userID = existingUser._id;
    const existingToken = await tokenUser.findOne({
      userId: userID,
    });

    if (!existingToken) {
      return res.status(410).json({
        message: "Your access token expired. Try again !",
      });
    }

    const checkNewPassword = passwordRegex.test(newPassword);

    if (!checkNewPassword) {
      return res.status(422).json({
        message:
          "Password must be between 6 and 14 characters long. Must have at least 1 uppercase, 1 lowercase, 1 number [0-9]",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(401)
        .json({ message: "Passwords do not match" });
    }

    if (newPassword === confirmNewPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      existingUser.password = hashedPassword;
      await existingUser.save();
      res.json({ message: "Password Changed Successfully" });
    }
  }
};
