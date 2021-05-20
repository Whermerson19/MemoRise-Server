import FakeUsersRepository from "../../../../accounts/repositories/fakes/FakeUsersRepository";
import FakeCardsRepository from "../../../repositories/fakes/FakeCardsRepository";
import FakeDecksRepository from "../../../repositories/fakes/FakeDecksRepository";

import CreateSessionUseCase from "../../../../accounts/useCases/session/createSession/CreateSessionUseCase";
import CreateUserUseCase from "../../../../accounts/useCases/users/createUser/CreateUserUseCase";
import CreateCardUseCase from "./CreateCardUseCase";
import CreateDeckUseCase from "../../decks/createDeck/CreateDeckUseCase";

import AppError from "../../../../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeDecksRepository: FakeDecksRepository;
let fakeCardsRepository: FakeCardsRepository;

let createUserUseCase: CreateUserUseCase;
let createSessionUseCase: CreateSessionUseCase;
let createDeckUseCase: CreateDeckUseCase;
let createCardUseCase: CreateCardUseCase;

describe("Create Card", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDecksRepository = new FakeDecksRepository();
    fakeCardsRepository = new FakeCardsRepository();

    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createSessionUseCase = new CreateSessionUseCase(fakeUsersRepository);
    createDeckUseCase = new CreateDeckUseCase(fakeDecksRepository);
    createCardUseCase = new CreateCardUseCase(
      fakeDecksRepository,
      fakeCardsRepository
    );
  });

  it("should be able to create a card", async () => {
    await createUserUseCase.execute({
      name: "Jonh Doe",
      username: "jonh_doe",
      email: "jonh_doe@email.com",
      password: "12345678",
      confirm_password: "12345678",
    });

    const session = await createSessionUseCase.execute({
      loginField: "jonh_doe",
      password: "12345678",
    });

    const deck = await createDeckUseCase.execute({
      title: "Title",
      subtitle: "Subtitle",
      user_id: session.user.id,
    });

    const card = await createCardUseCase.execute({
      front: "Front",
      versus: "Versus",
      deck_id: deck.id,
    });

    expect(deck.user_id).toEqual(session.user.id);
    expect(deck.id).toEqual(card.deck_id);
    expect(card).toHaveProperty("id");
  });

  it("should not be able to create a card with invalid deck_id", async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        name: "Jonh Doe",
        username: "jonh_doe",
        email: "jonh_doe@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });

      const session = await createSessionUseCase.execute({
        loginField: "jonh_doe",
        password: "12345678",
      });

      await createDeckUseCase.execute({
        title: "Title",
        subtitle: "Subtitle",
        user_id: session.user.id,
      });

      await createCardUseCase.execute({
        front: "Front",
        versus: "Versus",
        deck_id: "wrong deck id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
