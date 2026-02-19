import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

//llmando a las variables de entorno
dotenv.config();

const db = new Sequelize(process.env.DATA_BASE_URL, {
  dialect: "postgres",
  models:[__dirname + "/../models/**/*"],
  logging:false
});

export default db;
