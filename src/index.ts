import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { routes } from "./routes";

const app = express();
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
