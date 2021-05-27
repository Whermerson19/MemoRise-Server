import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPasswordUseCase from "./ResetPasswordUseCase";

export default class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    const { token } = request.params;
    const { password } = request.body;

    await resetPasswordUseCase.execute({
      token,
      password,
    });

    return response.send();
  }
}
