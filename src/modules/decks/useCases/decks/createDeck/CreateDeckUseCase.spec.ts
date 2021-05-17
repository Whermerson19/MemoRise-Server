import FakeUsersRepository from "../../../../accounts/repositories/fakes/FakeUsersRepository";
import FakeDecksRepository from "../../../repositories/fakes/FakeDecksRepository";
import CreateUserUseCase from "../../../../accounts/useCases/users/createUser/CreateUserUseCase";
import CreateSessionUseCase from "../../../../accounts/useCases/session/createSession/CreateSessionUseCase";
import CreateDeckUseCase from "./CreateDeckUseCase";

import AppError from "../../../../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeDecksRepository: FakeDecksRepository;
let createDeckUseCase: CreateDeckUseCase;
let createUserUseCase: CreateUserUseCase;
let createSessionUseCase: CreateSessionUseCase;

describe("Create Deck", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeDecksRepository = new FakeDecksRepository();
    createDeckUseCase = new CreateDeckUseCase(fakeDecksRepository);
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createSessionUseCase = new CreateSessionUseCase(fakeUsersRepository);
  });

  it("should be able to create a new deck", async () => {
    const user = await createUserUseCase.execute({
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
      user_id: user.id,
    });

    expect(session.user).toHaveProperty("id");
    expect(deck).toHaveProperty("id");
  });

  it("should not be able to create a new deck if Title already exist", async () => {
    await expect(async () => {
      const user = await createUserUseCase.execute({
        name: "Jonh Doe",
        username: "jonh_doe",
        email: "jonh_doe@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });

      await createSessionUseCase.execute({
        loginField: "jonh_doe",
        password: "12345678",
      });

      await createDeckUseCase.execute({
        title: "Title",
        subtitle: "Subtitle",
        user_id: user.id,
      });

      await createDeckUseCase.execute({
        title: "Title",
        subtitle: "Subtitle",
        user_id: user.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
