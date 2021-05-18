import FakeUsersRepository from "../../../../accounts/repositories/fakes/FakeUsersRepository";
import FakeDecksRepository from "../../../repositories/fakes/FakeDecksRepository";

import CreateUserUseCase from "../../../../accounts/useCases/users/createUser/CreateUserUseCase";
import CreateSessionUseCase from "../../../../accounts/useCases/session/createSession/CreateSessionUseCase";
import CreateDeckUseCase from "../createDeck/CreateDeckUseCase";
import ListDecksUseCase from "./ListDecksUseCase";

let fakeUsersRepository: FakeUsersRepository;
let fakeDecksRepository: FakeDecksRepository;

let createUserUseCase: CreateUserUseCase;
let createSessionUseCase: CreateSessionUseCase;
let createDeckUseCase: CreateDeckUseCase;
let listDecksUseCase: ListDecksUseCase;

describe("List Decks", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDecksRepository = new FakeDecksRepository();

    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createSessionUseCase = new CreateSessionUseCase(fakeUsersRepository);

    createDeckUseCase = new CreateDeckUseCase(fakeDecksRepository);
    listDecksUseCase = new ListDecksUseCase(fakeDecksRepository);
  });

  it("should be able to list all decks of a user", async () => {
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

    await createDeckUseCase.execute({
      title: "Deck_Two",
      subtitle: "Subtitle",
      user_id: session.user.id,
    });

    const decks = await listDecksUseCase.execute(session.user.id);

    expect(decks.length).toEqual(2);
  });
});
