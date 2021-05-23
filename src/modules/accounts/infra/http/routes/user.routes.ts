import { Router } from "express";

import multer from "multer";
import uploadConfig from "../../../../../shared/config/upload";

import { celebrate, Joi, Segments } from "celebrate";

import CreateUserController from "../../../useCases/users/createUser/CreateUserController";
import ensureAuthenticated from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import UpdateUserController from "../../../useCases/users/updateUserProfile/UpdateUserController";
import UpdateUserAvatarController from "../../../useCases/users/updateUserAvatar/UpdateUserAvatarController";

const userRouter = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

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
  ensureAuthenticated,
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

userRouter.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  ensureAuthenticated,
  updateUserAvatarController.handle
);

export default userRouter;
