import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { routes } from "./routes";

const app = express();

// Configuração do CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
