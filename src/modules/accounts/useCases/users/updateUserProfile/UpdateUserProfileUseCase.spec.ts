import FakeUsersRepository from "../../../repositories/fakes/FakeUsersRepository";

import CreateUserUseCase from "../createUser/CreateUserUseCase";
import UpdateUserProfileUseCase from "./UpdateUserProfileUseCase";
import CreateSessionUseCase from "../../session/createSession/CreateSessionUseCase";

import AppError from "../../../../../shared/errors/AppError";
import { compare } from "bcryptjs";

let fakeUsersRepository: FakeUsersRepository;
let createUserUseCase: CreateUserUseCase;
let updateUserProfileUseCase: UpdateUserProfileUseCase;
let createSessionUseCase: CreateSessionUseCase;

describe("Update User Profile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUserProfileUseCase = new UpdateUserProfileUseCase(
      fakeUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createSessionUseCase = new CreateSessionUseCase(fakeUsersRepository);
  });

  it("should be able to update user profile infos", async () => {
    const user = await createUserUseCase.execute({
      name: "Jonh Doe",
      username: "jonh_doe",
      email: "jonh_doe@gmail.com",
      password: "12345678",
      confirm_password: "12345678",
    });

    const session = await createSessionUseCase.execute({
      loginField: "jonh_doe",
      password: "12345678",
    });

    const { id } = session.user;

    const updateUser = await updateUserProfileUseCase.execute({
      id,
      name: "Changed_Name",
      username: "Changed_Username",
      email: "changed_email@email.com",
      current_password: "12345678",
      new_password: "987654321",
      confirm_new_password: "987654321",
    });

    const comparePassword = await compare("987654321", updateUser.password);

    expect(updateUser).toHaveProperty("id");
    expect(updateUser.name).toEqual("Changed_Name");
    expect(updateUser.username).toEqual("Changed_Username");
    expect(updateUser.email).toEqual("changed_email@email.com");
    expect(comparePassword).toBe(true);
  });
});
