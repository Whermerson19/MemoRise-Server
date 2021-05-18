import FakeUsersRepository from "../../../../accounts/repositories/fakes/FakeUsersRepository";
import FakeDecksRepository from "../../../repositories/fakes/FakeDecksRepository";

import CreateUserUseCase from "../../../../accounts/useCases/users/createUser/CreateUserUseCase";
import CreateSessionUseCase from "../../../../accounts/useCases/session/createSession/CreateSessionUseCase";
import CreateDeckUseCase from "../createDeck/CreateDeckUseCase";
import UpdateDeckUseCase from "./UpdateDeckUseCase";
import AppError from "../../../../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeDecksRepository: FakeDecksRepository;

let createUserUseCase: CreateUserUseCase;
let createSessionUseCase: CreateSessionUseCase;
let createDeckUseCase: CreateDeckUseCase;
let updateDeckUseCase: UpdateDeckUseCase;

describe("Update Deck", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDecksRepository = new FakeDecksRepository();

    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createSessionUseCase = new CreateSessionUseCase(fakeUsersRepository);

    createDeckUseCase = new CreateDeckUseCase(fakeDecksRepository);
    updateDeckUseCase = new UpdateDeckUseCase(fakeDecksRepository);
  });

  it("should be able to update a deck", async () => {
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

    const updatedDeck = await updateDeckUseCase.execute({
      list_id: deck.id,
      title: "Updated Title",
      subtitle: "Updated Subtitle",
    });

    expect(updatedDeck.title).toEqual("Updated Title");
    expect(updatedDeck.subtitle).toEqual("Updated Subtitle");
  });

  it("should not be able to update a deck if title already exist", async () => {
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

      const deck_one = await createDeckUseCase.execute({
        title: "Deck One",
        subtitle: "Subtitle",
        user_id: session.user.id,
      });

      const deck_two = await createDeckUseCase.execute({
        title: "Deck One",
        subtitle: "Subtitle",
        user_id: session.user.id,
      });

      await updateDeckUseCase.execute({
        list_id: deck_one.id,
        title: "Deck One",
        subtitle: "Updated Subtitle",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
