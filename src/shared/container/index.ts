import { container } from "tsyringe";

import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
import IDecksRepository from "../../modules/decks/repositories/IDecksRepository";
import ICardsRepository from "../../modules/decks/repositories/ICardsRepository";

import UsersRepository from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import DecksRepository from "../../modules/decks/infra/typeorm/repositories/DecksRepository";
import CardsRepository from "../../modules/decks/infra/typeorm/repositories/CardsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IDecksRepository>(
  "DecksRepository",
  DecksRepository
);

container.registerSingleton<ICardsRepository>(
  "CardsRepository",
  CardsRepository
);
