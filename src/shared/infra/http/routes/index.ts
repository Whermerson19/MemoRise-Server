import { Router } from "express";
import sessionRouter from "../../../../modules/accounts/infra/http/routes/session.routes";
import userRouter from "../../../../modules/accounts/infra/http/routes/user.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);

export default appRouter;
