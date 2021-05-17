import { Router } from "express";

import userRouter from "../../../../modules/accounts/infra/http/routes/user.routes";
import sessionRouter from "../../../../modules/accounts/infra/http/routes/session.routes";

import deckRouter from "../../../../modules/decks/infra/http/routes/deck.routes";

const appRouter = Router();

// user module
appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);

// deck module
appRouter.use("/deck", deckRouter);

export default appRouter;
