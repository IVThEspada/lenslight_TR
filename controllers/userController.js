import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      succeded: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      succeded: false,
      err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        err: "Kullanıcı Bulunamadı!",
      });
    }

    if (same) {
      res.status(200).json({
        user,
        token: createToken(user._id),
      });
    } else {
      res.status(401).json({
        succeded: false,
        err: "Şifre yanlış!",
      });
    }
  } catch (err) {
    res.status(500).json({
      succeded: false,
      err,
    });
  }
};

const createToken = (userId) => {
  return Jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export { createUser, loginUser };
