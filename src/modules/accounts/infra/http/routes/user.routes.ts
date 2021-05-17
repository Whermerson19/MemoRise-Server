import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import CreateUserController from "../../../useCases/users/createUser/CreateUserController";
import Authorization from "../../../../../shared/infra/http/middlewares/Authorization";
import UpdateUserController from "../../../useCases/users/updateUserProfile/UpdateUserController";

const userRouter = Router();
const authorization = new Authorization();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

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

userRouter.put(
  "/",
  authorization.userAccess,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      current_password: Joi.string(),
      new_password: Joi.string(),
      confirm_new_password: Joi.ref("new_password"),
    }),
  }),
  updateUserController.handle
);

export default userRouter;
