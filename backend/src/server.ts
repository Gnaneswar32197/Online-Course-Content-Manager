import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db";

import authRoutes from "./routes/authRoutes";
import courseRoutes from "./routes/courseRoutes";
import userRoutes from "./routes/userRoutes";
import { seedSuperAdmin } from "./seed/seedSuperAdmin";


dotenv.config();

console.log("JWT:",process.env.JWT_SECRET); 
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/users",userRoutes);

sequelize.sync({ alter: true }).then(async () => {
  console.log(" DB Connected ");

  await seedSuperAdmin();

  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT} `);
  });
});