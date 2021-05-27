import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import SendForgotPasswordMailController from "../../../useCases/password/forgotPassword/SendForgotPasswordMailController";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  sendForgotPasswordMailController.handle
);

export default passwordRouter;
