import "reflect-metadata";
import "@/settings";
import "@/shared/app/app.container";

import express from "express";
import { container } from "tsyringe";
import { AppRouter } from "./shared/app/app.router";
import { expressErrorHandler } from "./shared/middlewares";

const app = express();
const port = 3000;

app.use(express.json());

const appRouter = container.resolve(AppRouter);

appRouter.register(app);

app.use(expressErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
