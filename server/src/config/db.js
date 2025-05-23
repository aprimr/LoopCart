import "./dotenv.js";
import mongoose from "mongoose";

function db() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default db;
