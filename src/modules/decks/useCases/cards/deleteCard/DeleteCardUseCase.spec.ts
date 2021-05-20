import FakeUsersRepository from "../../../../accounts/repositories/fakes/FakeUsersRepository";
import FakeCardsRepository from "../../../repositories/fakes/FakeCardsRepository";
import FakeDecksRepository from "../../../repositories/fakes/FakeDecksRepository";

import CreateSessionUseCase from "../../../../accounts/useCases/session/createSession/CreateSessionUseCase";
import CreateUserUseCase from "../../../../accounts/useCases/users/createUser/CreateUserUseCase";
import CreateDeckUseCase from "../../decks/createDeck/CreateDeckUseCase";
import CreateCardUseCase from "../createCard/CreateCardUseCase";
import DeleteCardUseCase from "./DeleteCardUseCase";
import ListCardUseCase from "../listCards/ListCardsUseCase";

import AppError from "../../../../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeDecksRepository: FakeDecksRepository;
let fakeCardsRepository: FakeCardsRepository;

let createUserUseCase: CreateUserUseCase;
let createSessionUseCase: CreateSessionUseCase;
let createDeckUseCase: CreateDeckUseCase;
let createCardUseCase: CreateCardUseCase;
let deleteCardUseCase: DeleteCardUseCase;
let listCardUseCase: ListCardUseCase;

describe("Delete Card", () => {
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
    deleteCardUseCase = new DeleteCardUseCase(fakeCardsRepository);
    listCardUseCase = new ListCardUseCase(
      fakeCardsRepository,
      fakeDecksRepository
    );
  });

  it("should be able to delete a card", async () => {
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

    const card1 = await createCardUseCase.execute({
      front: "Front 01",
      versus: "Versus 01",
      deck_id: deck.id,
      user_id: session.user.id,
    });

    const card2 = await createCardUseCase.execute({
      front: "Front 02",
      versus: "Versus 02",
      deck_id: deck.id,
      user_id: session.user.id,
    });

    await deleteCardUseCase.execute(card1.id);

    const cards = await listCardUseCase.execute({
      deck_id: deck.id,
      user_id: session.user.id,
    });

    console.log(cards)

    expect(cards.length).toEqual(1);
  });
});
