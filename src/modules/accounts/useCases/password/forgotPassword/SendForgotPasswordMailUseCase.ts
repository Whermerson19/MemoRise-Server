import { inject, injectable } from "tsyringe";
import { stringify } from "uuid";
import IMailProvider from "../../../../../shared/container/providers/mailProvider/IMailProvider";
import AppError from "../../../../../shared/errors/AppError";
import IUsersRepository from "../../../repositories/IUsersRepository";

import path from "path";
import IUsersTokensRepository from "../../../repositories/IUsersTokensRepository";

@injectable()
export default class SendForgotPasswordMailUseCase {
  constructor(
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("This User does not exist", 404);

    const template = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "views",
      "forgot_password.hbs"
    );

    const { token } = await this.usersTokensRepository.create(user.id);

    await this.mailProvider.sendMail(
      user.email,
      "Email de recuperação de senha",
      {
        link: `http://localhost:3000/password/reset/${token}`,
        name: user.name,
      },
      template
    );
  }
}
