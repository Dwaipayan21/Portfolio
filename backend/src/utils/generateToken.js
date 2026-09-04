import jwt from "jsonwebtoken";

const generateToken = (adminId) =>
  jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export default generateToken;