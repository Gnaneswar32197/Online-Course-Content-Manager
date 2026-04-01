import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import { sequelize } from "./config/db";
import authRoutes from "./routes/authRoutes";
import { seedSuperAdmin } from "./seed/seedSuperAdmin";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("DB Connected");

    await seedSuperAdmin();

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (err) {
    console.error("Error:", err);
  }
};

startServer();