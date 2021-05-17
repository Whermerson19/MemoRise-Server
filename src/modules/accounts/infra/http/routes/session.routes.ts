import { Router } from "express";
import CreateSessionController from "../../../useCases/session/createSession/CreateSessionController";

const sessionRouter = Router();

const createSessionController = new CreateSessionController();

sessionRouter.post("/", createSessionController.handle);

export default sessionRouter;
