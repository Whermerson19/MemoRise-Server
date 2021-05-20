import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ensureAuthenticated from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import CreateCardController from "../../../useCases/cards/createCard/CreateCardController";
import ListCardsController from "../../../useCases/cards/listCards/ListCardsController";

const cardRouter = Router();

const createCardController = new CreateCardController();
const listCardsController = new ListCardsController();

cardRouter.get("/:deck_id", ensureAuthenticated, listCardsController.handle);

cardRouter.post(
  "/:deck_id",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      front: Joi.string().required().max(200),
      versus: Joi.string().required().max(200),
    }),
  }),
  createCardController.handle
);

export default cardRouter;
