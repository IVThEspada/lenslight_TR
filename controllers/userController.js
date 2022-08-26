import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import Photo from "../models/photoModel.js";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user: user._id });
  } catch (err) {
    let errors2 = {};

    if (err.code === 11000) {
      errors2.email = "Email is already registered!";
    }

    if (err.name === "ValidationError") {
      Object.keys(err.errors).forEach((key) => {
        errors2[key] = err.errors[key].message;
      });
    }
    res.status(400).json(errors2);
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
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.redirect("/users/dashboard");
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

const getDashboardPage = async (req, res) => {
  const photos = await Photo.find({ user: res.locals.user._id });
  res.render("dashboard", {
    link: "dashboard",
    photos,
  });
};

export { createUser, loginUser, getDashboardPage };
