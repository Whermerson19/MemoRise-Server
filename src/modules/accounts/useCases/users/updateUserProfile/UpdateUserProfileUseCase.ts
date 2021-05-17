import { inject, injectable } from "tsyringe";

import User from "../../../infra/typeorm/entities/User";
import IUsersRepository from "../../../repositories/IUsersRepository";

import { hash, compare } from "bcryptjs";

import AppError from "../../../../../shared/errors/AppError";

interface IRequest {
  id: string;
  name: string;
  username: string;
  email: string;

  current_password?: string;
  new_password?: string;
  confirm_new_password?: string;
}

@injectable()
export default class UpdateUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    id,
    name,
    username,
    email,
    confirm_new_password,
    current_password,
    new_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError("This user does not exist", 404);

    user.name = name;
    user.username = username;
    user.email = email;

    if (current_password && new_password && !confirm_new_password)
      throw new AppError("Please confirm your new password");

    if (current_password && !new_password && confirm_new_password)
      throw new AppError("Please inform your new password");

    if (new_password !== confirm_new_password)
      throw new AppError("Passwords does not match");

    if (current_password && new_password && confirm_new_password) {
      const comparePassword = await compare(current_password, user.password);
      if (!comparePassword) throw new AppError("Invalid password");

      const passwordLength = current_password.split("");
      if (passwordLength.length < 8)
        throw new AppError("Password must have a minimun of 8 characters");

      const encryptedPassword = await hash(new_password, 10);

      user.password = encryptedPassword;
    }

    return this.usersRepository.save(user);
  }
}
