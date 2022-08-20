import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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

    console.log(req.body);

    const user = await User.findOne({ username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
      console.log("same", same);
    } else {
      return res.status(401).json({
        succeded: false,
        err: "Kullanıcı Bulunamadı!",
      });
    }

    if (same) {
      res.status(200).send("Giriş Yaptınız!");
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

export { createUser, loginUser };
