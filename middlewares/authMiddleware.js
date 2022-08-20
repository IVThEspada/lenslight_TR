import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res.status(401).json({
        succedded: false,
        err: "Token Bulunamadı!",
      });
    }

    req.user = await User.findById(
      Jwt.verify(token, process.env.JWT_SECRET).userId
    );

    next();
  } catch (err) {
    res.status(401).json({
      succedded: false,
      err: "Not Authorized",
    });
  }
};

export { authenticateToken };
