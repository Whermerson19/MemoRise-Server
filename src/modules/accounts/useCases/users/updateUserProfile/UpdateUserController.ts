import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserProfileUseCase from "./UpdateUserProfileUseCase";

export default class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateUserProfileUseCase = container.resolve(
      UpdateUserProfileUseCase
    );

    const id = request.user.id;

    const {
      name,
      username,
      email,
      current_password,
      new_password,
      confirm_new_password,
    } = request.body;

    const user = await updateUserProfileUseCase.execute({
      id,
      name,
      username,
      email,
      current_password,
      new_password,
      confirm_new_password,
    });

    return response.status(200).json(classToClass(user));
  }
}
