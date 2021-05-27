import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import SendForgotPasswordMailController from "../../../useCases/password/forgotPassword/SendForgotPasswordMailController";
import ResetPasswordController from "../../../useCases/password/resetPassword/ResetPasswordController";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController()

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  sendForgotPasswordMailController.handle
);

passwordRouter.patch(
  "/reset/:token",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required().min(8),
    }),
  }),
  resetPasswordController.handle
);

export default passwordRouter;
