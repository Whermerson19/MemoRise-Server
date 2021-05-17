import FakeUsersRepository from "../../../repositories/fakes/FakeUsersRepository";

import CreateSessionUseCase from "./CreateSessionUseCase";
import CreateUserUseCase from "../../users/createUser/CreateUserUseCase";

import AppError from "../../../../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let createUserUseCase: CreateUserUseCase;
let createSessionUseCase: CreateSessionUseCase;

describe("Create Session", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createSessionUseCase = new CreateSessionUseCase(fakeUsersRepository);
  });

  it("should be able to create a new session with email or username", async () => {
    await createUserUseCase.execute({
      name: "Jonh Doe",
      username: "jonh_doe",
      email: "jonh@email.com",
      password: "12345678",
      confirm_password: "12345678",
    });

    const session_email = await createSessionUseCase.execute({
      loginField: "jonh@email.com",
      password: "12345678",
    });

    const session_username = await createSessionUseCase.execute({
      loginField: "jonh_doe",
      password: "12345678",
    });

    expect(session_email).toHaveProperty("token");
    expect(session_username).toHaveProperty("token");
  });

  it("should not be able to create a session with worng email or username", async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        name: "Jonh Doe",
        username: "jonh_doe",
        email: "jonh@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });

      await createSessionUseCase.execute({
        loginField: "wrong-mail@email.com",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a session with worng password", async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        name: "Jonh Doe",
        username: "jonh_doe",
        email: "jonh@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });

      await createSessionUseCase.execute({
        loginField: "jonh@email.com",
        password: "wrong_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
