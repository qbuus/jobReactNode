import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const secret = process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret, async (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden" });
    req.user = decoded.username;
    req.role = decoded.role;
    req.id = decoded.id;
    next();
  });
};

export default verifyToken;
