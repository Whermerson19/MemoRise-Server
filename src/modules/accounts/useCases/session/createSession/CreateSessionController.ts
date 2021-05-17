import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSessionUseCase from "./CreateSessionUseCase";

import { classToClass } from "class-transformer";

export default class CreateSessionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const { loginField, password } = request.body;

    const data = await createSessionUseCase.execute({
      loginField,
      password,
    });

    return response.status(201).json(classToClass(data));
  }
}
