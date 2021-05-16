import User from "../../../infra/typeorm/entities/User";
import IUsersRepository from "../../../repositories/IUsersRepository";

import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import AppError from "../../../../../shared/errors/AppError";

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
      throw new AppError("Username and Email are already in use");

    if (!checkUsername && checkEmail)
      throw new AppError("Email is already in use");

    if (checkUsername && !checkEmail)
      throw new AppError("Username is already in use");

    if (confirm_password !== password)
      throw new AppError("Passwords does not match");

    const checkPasswordLength = password.split("");

    if (checkPasswordLength.length < 8)
      throw new AppError("Password must have a minimum of 8 characters");

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
