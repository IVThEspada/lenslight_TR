import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      Jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.status(401).json({
      succedded: false,
      err: "Not Authorized",
    });
  }
};

export { authenticateToken };
