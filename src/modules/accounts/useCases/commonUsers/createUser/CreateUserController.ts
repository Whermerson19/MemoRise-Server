import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);

      const { name, username, email, password, confirm_password } =
        request.body;

      const user = await createUserUseCase.execute({
        name,
        username,
        email,
        password,
        confirm_password,
      });

      return response.status(201).json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
