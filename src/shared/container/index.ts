import { container } from "tsyringe";
import UsersRepository from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
import DecksRepository from "../../modules/decks/infra/typeorm/repositories/DecksRepository";
import IDecksRepository from "../../modules/decks/repositories/IDecksRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IDecksRepository>(
  "DecksRepository",
  DecksRepository
)
