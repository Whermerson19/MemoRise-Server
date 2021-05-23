import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

export default class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const user_id = request.user.id;
    const avatar = request.file.filename;

    const user = await updateUserAvatarUseCase.execute({
      user_id,
      avatar,
    });

    return response.status(201).json(classToClass(user));
  }
}
