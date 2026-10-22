import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import generateToken from "../utils/generateToken.js";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin._id);

    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Logged in",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  const { maxAge, ...clearOptions } = cookieOptions;

  res.clearCookie("token", clearOptions);
  return res.status(200).json({ message: "Logged out" });
};

export const checkAuth = (req, res) => {
  return res.status(200).json({ authenticated: true });
};
