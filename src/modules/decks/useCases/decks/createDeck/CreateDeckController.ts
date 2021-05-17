import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateDeckUseCase from "./CreateDeckUseCase";

export default class CreateDeckController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createDeckUseCase = container.resolve(CreateDeckUseCase);

    const user_id = request.user.id;
    const { title, subtitle } = request.body;

    const deck = await createDeckUseCase.execute({
      user_id,
      title,
      subtitle,
    });

    return response.status(201).json(deck);
  }
}
