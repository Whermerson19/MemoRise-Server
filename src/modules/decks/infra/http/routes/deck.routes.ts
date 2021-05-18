import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ensureAuthenticated from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import CreateDeckController from "../../../useCases/decks/createDeck/CreateDeckController";
import ListDecksController from "../../../useCases/decks/listDecks/ListDecksController";

const deckRouter = Router();

const createDeckControlle = new CreateDeckController();
const listDecksController = new ListDecksController();

deckRouter.post(
  "/",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().max(50),
      subtitle: Joi.string().max(100),
    }),
  }),
  createDeckControlle.handle
);

deckRouter.get(
  "/",
  ensureAuthenticated,
  listDecksController.handle
);

export default deckRouter;
