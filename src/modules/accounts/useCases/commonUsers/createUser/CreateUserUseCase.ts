import User from "../../../infra/typeorm/entities/User";
import IUsersRepository from "../../../repositories/IUsersRepository";

import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    username,
    email,
    password,
    confirm_password,
  }: IRequest): Promise<User> {
    const checkUsername = await this.usersRepository.findByUsername(username);
    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkUsername && checkEmail)
      throw new Error("Username and Email are already in use");

    if (!checkUsername && checkEmail)
      throw new Error("Email is already in use");

    if (checkUsername && !checkEmail)
      throw new Error("Username is already in use");

    if (confirm_password !== password)
      throw new Error("Passwords does not match");

    const checkPasswordLength = password.split("");

    if (checkPasswordLength.length < 8)
      throw new Error("Password must have a minimum of 8 characters");

    const encryptedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: encryptedPassword,
    });

    return user;
  }
}
