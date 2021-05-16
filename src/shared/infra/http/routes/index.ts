import { Router } from "express";
import userRouter from "../../../../modules/accounts/infra/http/routes/user.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);

export default appRouter;
