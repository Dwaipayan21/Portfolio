import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(admin._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Logged in" });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logged out" });
};

export const checkAuth = (req, res) => {
  res.json({ authenticated: true });
};