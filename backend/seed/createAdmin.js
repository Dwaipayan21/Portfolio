import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../src/models/admin.model.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      passwordHash,
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();