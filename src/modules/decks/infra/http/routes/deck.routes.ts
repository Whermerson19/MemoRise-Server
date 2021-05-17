import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import Authorization from "../../../../../shared/infra/http/middlewares/Authorization";
import CreateDeckController from "../../../useCases/decks/createDeck/CreateDeckController";

const deckRouter = Router();
const authorization = new Authorization();

const createDeckControlle = new CreateDeckController();

deckRouter.post(
  "/",
  authorization.userAccess,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().max(50),
      subtitle: Joi.string().max(100),
    }),
  }),
  createDeckControlle.handle
);

export default deckRouter;
