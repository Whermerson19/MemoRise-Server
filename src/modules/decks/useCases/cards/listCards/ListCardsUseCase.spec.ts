import FakeUsersRepository from "../../../../accounts/repositories/fakes/FakeUsersRepository";
import FakeCardsRepository from "../../../repositories/fakes/FakeCardsRepository";
import FakeDecksRepository from "../../../repositories/fakes/FakeDecksRepository";

import CreateSessionUseCase from "../../../../accounts/useCases/session/createSession/CreateSessionUseCase";
import CreateUserUseCase from "../../../../accounts/useCases/users/createUser/CreateUserUseCase";
import CreateDeckUseCase from "../../decks/createDeck/CreateDeckUseCase";
import CreateCardUseCase from "../createCard/CreateCardUseCase";
import ListCardsUseCase from "./ListCardsUseCase";

import AppError from "../../../../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeDecksRepository: FakeDecksRepository;
let fakeCardsRepository: FakeCardsRepository;

let createUserUseCase: CreateUserUseCase;
let createSessionUseCase: CreateSessionUseCase;
let createDeckUseCase: CreateDeckUseCase;
let createCardUseCase: CreateCardUseCase;
let listCardsUseCase: ListCardsUseCase;

describe("List Cards", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDecksRepository = new FakeDecksRepository();
    fakeCardsRepository = new FakeCardsRepository();

    createDeckUseCase = new CreateDeckUseCase(fakeDecksRepository);
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createSessionUseCase = new CreateSessionUseCase(fakeUsersRepository);

    createCardUseCase = new CreateCardUseCase(
      fakeDecksRepository,
      fakeCardsRepository
    );
    listCardsUseCase = new ListCardsUseCase(
      fakeCardsRepository,
      fakeDecksRepository
    );
  });

  it("should be able to list all cards of a user", async () => {
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

    await createCardUseCase.execute({
      front: "card 01 title",
      versus: "card 01 versus",
      deck_id: deck.id,
    });

    await createCardUseCase.execute({
      front: "card 02 title",
      versus: "card 02 versus",
      deck_id: deck.id,
    });

    await createCardUseCase.execute({
      front: "card 03 title",
      versus: "card 03 versus",
      deck_id: deck.id,
    });

    const cards = await listCardsUseCase.execute({
      deck_id: deck.id,
      user_id: session.user.id,
    });

    expect(cards.length).toEqual(3);
  });

  it("should not be able to list cards with invalid deck id", async () => {
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

      const deck1 = await createDeckUseCase.execute({
        title: "Title",
        subtitle: "Subtitle",
        user_id: session.user.id,
      });

      const deck2 = await createDeckUseCase.execute({
        title: "Title",
        subtitle: "Subtitle",
        user_id: session.user.id,
      });

      await createCardUseCase.execute({
        front: "card 01 title",
        versus: "card 01 versus",
        deck_id: deck1.id,
      });

      await listCardsUseCase.execute({
        deck_id: deck2.id,
        user_id: session.user.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to list cards of another user", async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        name: "Jonh Doe",
        username: "jonh_doe",
        email: "jonh_doe@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });

      const anotherUser = await createUserUseCase.execute({
        name: "Another user",
        username: "another_user",
        email: "another_user@email.com",
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

      await createCardUseCase.execute({
        front: "card 01 title",
        versus: "card 01 versus",
        deck_id: deck.id,
      });

      await createCardUseCase.execute({
        front: "card 02 title",
        versus: "card 02 versus",
        deck_id: deck.id,
      });

      await createCardUseCase.execute({
        front: "card 03 title",
        versus: "card 03 versus",
        deck_id: deck.id,
      });

      await listCardsUseCase.execute({
        deck_id: deck.id,
        user_id: anotherUser.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
