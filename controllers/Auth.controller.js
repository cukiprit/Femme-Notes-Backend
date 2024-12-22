import "dotenv/config";

import Users from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const checkUser = await Users.findOne({ where: { email: email } });

  if (checkUser) {
    return res
      .status(404)
      .json({ message: "Error", errors: "User already exists!" });
  }

  const hashedPass = bcrypt.hash(password, 10);

  const newUser = await Users.create({
    name,
    email,
    password: hashedPass,
  });

  const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
    expiresIn: "24h",
  });

  return res.status(201).json({
    message: "Success",
    token,
  });
};

export const SignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "error",
      errors: "Email or password are required!",
    });
  }

  try {
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        message: "Error",
        errors: "User not found!",
      });
    }

    const passwordValid = bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(404).json({
        message: "Error",
        errors: "Email or password is invalid",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({ message: "Success", token });
  } catch (err) {
    return res.status(500).json({
      message: "Error",
      errors: "Internal server error",
    });
  }
};

export const GetProfileUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Error",
        errors: "User not found!",
      });
    }

    return res.status(200).json({
      message: "Success",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    return res.status(401).json({
      message: "Error",
      errors: "Invalid or expired token",
    });
  }
};

export const UpdateProfile = async (req, res) => {
  const { nama } = req.body;

  try {
    const user = await Users.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Error",
        errors: "User not found!",
      });
    }

    const data = await user.update({ nama: nama });

    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Error",
      errors: "Invalid or expired token",
    });
  }
};
