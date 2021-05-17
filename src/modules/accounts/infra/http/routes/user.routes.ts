import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import CreateUserController from "../../../useCases/users/createUser/CreateUserController";

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
      confirm_password: Joi.ref("password"),
    }),
  }),
  createUserController.handle
);

export default userRouter;
