import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

import { errors } from "celebrate";
import AppError from "./shared/errors/AppError";

import appRouter from "./shared/infra/http/routes";

import "./shared/infra/typeorm";
import "./shared/container";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(
  "/files/avatar",
  express.static(path.resolve(__dirname, "..", "tmp", "avatar"))
);

app.use(appRouter);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Memorise server is Running"));

export default app;
