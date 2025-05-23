import "./src/config/dotenv.js";
import express from "express";
import cors from "cors";
import db from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";

const app = express();
db();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.get("/keep-alive", (req, res) => {
  res.status(200).json({ message: "Keep alive" });
});

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
