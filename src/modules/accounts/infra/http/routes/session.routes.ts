import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import CreateSessionController from "../../../useCases/session/createSession/CreateSessionController";

const sessionRouter = Router();

const createSessionController = new CreateSessionController();

sessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      loginField: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  createSessionController.handle
);

export default sessionRouter;
