import "reflect-metadata";

import express from "express";
import appRouter from "./shared/infra/http/routes";

import "./shared/container";
import "./shared/infra/typeorm";

const app = express();
app.use(express.json());

app.listen(3333, () => console.log("Memorise server is Running"));

app.use(appRouter);

export default app;
