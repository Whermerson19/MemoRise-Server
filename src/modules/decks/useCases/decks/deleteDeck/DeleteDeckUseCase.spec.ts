import FakeUsersRepository from "../../../../accounts/repositories/fakes/FakeUsersRepository";
import FakeDecksRepository from "../../../repositories/fakes/FakeDecksRepository";

import CreateUserUseCase from "../../../../accounts/useCases/users/createUser/CreateUserUseCase";
import CreateSessionUseCase from "../../../../accounts/useCases/session/createSession/CreateSessionUseCase";
import CreateDeckUseCase from "../createDeck/CreateDeckUseCase";
import DeleteDeckUseCase from "./DeleteDeckUseCase";
import ListDecksUseCase from "../listDecks/ListDecksUseCase";
import AppError from "../../../../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeDecksRepository: FakeDecksRepository;

let createUserUseCase: CreateUserUseCase;
let createSessionUseCase: CreateSessionUseCase;

let createDeckUseCase: CreateDeckUseCase;
let deleteDeckUseCase: DeleteDeckUseCase;
let listDecksUseCase: ListDecksUseCase;

describe("Delete Deck", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDecksRepository = new FakeDecksRepository();

    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createSessionUseCase = new CreateSessionUseCase(fakeUsersRepository);

    createDeckUseCase = new CreateDeckUseCase(fakeDecksRepository);
    deleteDeckUseCase = new DeleteDeckUseCase(fakeDecksRepository);
    listDecksUseCase = new ListDecksUseCase(fakeDecksRepository);
  });

  it("should be able to delete a deck", async () => {
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

    const deck_one = await createDeckUseCase.execute({
      title: "Deck_One",
      subtitle: "Subtitle",
      user_id: session.user.id,
    });

    const deck_two = await createDeckUseCase.execute({
      title: "Deck_Two",
      subtitle: "Subtitle",
      user_id: session.user.id,
    });

    await deleteDeckUseCase.execute(deck_two.id);

    const list = await listDecksUseCase.execute(session.user.id);

    expect(list.length).toEqual(1);
    expect(list[0].title).toEqual("Deck_One")
  });

  it("should not be able to delete a deck with invalid deck_id", async () => {
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
        title: "Deck_One",
        subtitle: "Subtitle",
        user_id: session.user.id,
      });

      await deleteDeckUseCase.execute("wrong id");
    }).rejects.toBeInstanceOf(AppError);
  });
});
