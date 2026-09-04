// import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();
console.log(`PORT is : ${process.env.PORT}`);
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));