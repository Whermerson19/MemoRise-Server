import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import IUsersRepository from "../../../repositories/IUsersRepository";
import IUsersTokensRepository from "../../../repositories/IUsersTokensRepository";

import AppError from "../../../../../shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokesRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokesRepository.findByToken(token);

    if (!userToken) throw new AppError("Invalid token");

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError("This user does not exist", 404);

    const created_date_token = userToken.created_at;
    const date_now = new Date(Date.now());

    if (date_now.getHours() - created_date_token.getHours() > 2)
      throw new AppError("Expired token");

    const encryptedPassword = await hash(password, 10);

    user.password = encryptedPassword;

    await this.usersRepository.save(user);
    await this.usersTokesRepository.delete(userToken.id);
  }
}
