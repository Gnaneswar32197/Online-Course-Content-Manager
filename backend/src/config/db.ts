import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Course } from "../models/Course";

dotenv.config();

export const sequelize = new Sequelize({
  database: "Online_Course_Content_Manager",
  dialect: "mysql",
  username: "root",
  password: "root",
  host: "localhost",

  models: [User, Course],
  logging: false,
});