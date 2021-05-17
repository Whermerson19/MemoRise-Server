import { inject, injectable } from "tsyringe";

import User from "../../../infra/typeorm/entities/User";
import IUsersRepository from "../../../repositories/IUsersRepository";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import AppError from "../../../../../shared/errors/AppError";
import authConfig from "../../../../../shared/config/auth";

interface IRequest {
  loginField: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class CreateSessionUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ loginField, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUser(loginField);

    if (!user) throw new AppError("Invalid credentials!", 401);

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) throw new AppError("Invalid credentials!", 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
