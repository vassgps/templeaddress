import "reflect-metadata";
import migrations from "@/migrations";
import entities from "../src/entity";
import "reflect-metadata";
import { DataSource } from "typeorm";
require("dotenv").config();

const poolConfig = {
  min: 1,
  max: 10,
};

const AppDataSourceV = new DataSource({
  type: "postgres",
  name: "templeaddress",
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: Number(process.env.NEXT_PUBLIC_DB_PORT),
  username: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASS,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  synchronize: true,
  logging: false,
  entities: entities,
  migrations: migrations,
  subscribers: [],
  ssl: true,
  extra: {
    pool: poolConfig,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const AppDataSource = async () => {
  if (process.env.NEXT_PUBLIC_NODE_ENV != "production") {
    if (!global.db || global.db === undefined) {
      global.db = await AppDataSourceV.initialize();
    }
    return global.db;
  } else {
    
    if(!AppDataSourceV.isInitialized){
      await AppDataSourceV.initialize();
    }
    return AppDataSourceV;
  }
};

export { AppDataSource };
