import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario";
import { Suporte } from "./entity/Suporte";
import { AtividadeESG } from "./entity/Atividade";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-us-west-1.pooler.supabase.com",
  port: 6543,
  username: "postgres.xibvypndxvkgrqoyfpmw",
  password: "14116566Br***",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Usuario, Suporte, AtividadeESG],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
