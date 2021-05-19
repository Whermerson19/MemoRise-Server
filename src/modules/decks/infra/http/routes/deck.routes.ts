import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ensureAuthenticated from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";

import ListDecksController from "../../../useCases/decks/listDecks/ListDecksController";
import CreateDeckController from "../../../useCases/decks/createDeck/CreateDeckController";
import UpdateDeckController from "../../../useCases/decks/updateDeck/UpdateDeckController";
import DeleteDeckController from "../../../useCases/decks/deleteDeck/DeleteDeckController";

const deckRouter = Router();

const listDecksController = new ListDecksController();
const createDeckControlle = new CreateDeckController();
const updateDeckController = new UpdateDeckController();
const deleteDeckController = new DeleteDeckController();

deckRouter.get("/", ensureAuthenticated, listDecksController.handle);

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

deckRouter.put(
  "/:list_id",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().max(50),
      subtitle: Joi.string().max(100),
    }),
  }),
  updateDeckController.handle
);

deckRouter.delete("/:id", ensureAuthenticated, deleteDeckController.handle);

export default deckRouter;
