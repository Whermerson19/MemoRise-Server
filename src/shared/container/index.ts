import "./providers";

import { container } from "tsyringe";

import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
import IDecksRepository from "../../modules/decks/repositories/IDecksRepository";
import ICardsRepository from "../../modules/decks/repositories/ICardsRepository";

import UsersRepository from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import DecksRepository from "../../modules/decks/infra/typeorm/repositories/DecksRepository";
import CardsRepository from "../../modules/decks/infra/typeorm/repositories/CardsRepository";
import IUsersTokensRepository from "../../modules/accounts/repositories/IUsersTokensRepository";
import UsersTokensRepository from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<IDecksRepository>(
  "DecksRepository",
  DecksRepository
);

container.registerSingleton<ICardsRepository>(
  "CardsRepository",
  CardsRepository
);
