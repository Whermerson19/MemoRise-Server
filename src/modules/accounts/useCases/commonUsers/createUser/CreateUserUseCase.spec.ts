import FakeUsersRepository from "../../../repositories/fakes/FakeUsersRepository";
import CreateUserUseCase from "./CreateUserUseCase";

let fakeUsersRepository: FakeUsersRepository;
let createUsersUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUsersUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUsersUseCase.execute({
      name: "User Name",
      username: "User Username",
      email: "user@email.com",
      password: "12345678",
      confirm_password: "12345678",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with same username", async () => {
    await expect(async () => {
      await createUsersUseCase.execute({
        name: "User Name",
        username: "Same Username",
        email: "user@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });

      await createUsersUseCase.execute({
        name: "User Name",
        username: "Same Username",
        email: "other@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a new user with same email", async () => {
    await expect(async () => {
      await createUsersUseCase.execute({
        name: "User Name",
        username: "User Username",
        email: "same@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });

      await createUsersUseCase.execute({
        name: "User Name",
        username: "Other username",
        email: "same@email.com",
        password: "12345678",
        confirm_password: "12345678",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a new user if passwords not match", async () => {
    await expect(async () => {
      await createUsersUseCase.execute({
        name: "User Name",
        username: "User username",
        email: "user@email.com",
        password: "password",
        confirm_password: "wrong_confirm_password",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a new user with password less than 8 characters", async () => {
    await expect(async () => {
      await createUsersUseCase.execute({
        name: "User Name",
        username: "User username",
        email: "user@email.com",
        password: "123456",
        confirm_password: "123456",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
