import "./src/config/dotenv.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import adminRouter from "./src/routes/admin.routes.js";
import productRouter from "./src/routes/product.routes.js";
import dashboardRouter from "./src/routes/dashboard.routes.js";

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
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/dashboard", dashboardRouter);

app.get("/api/keep-alive", (req, res) => {
  res.status(200).json({ message: "Keep alive" });
});

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
