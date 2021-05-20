import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCardUseCase from "./CreateCardUseCase";

export default class CreateCardController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createCardUseCase = container.resolve(CreateCardUseCase);

    const { deck_id } = request.params;
    const { front, versus } = request.body;

    const card = await createCardUseCase.execute({
      front,
      versus,
      deck_id,
    });

    return response.status(201).json(card);
  }
}
