import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateCardUseCase from "./UpdateCardUseCase";

export default class UpdateCardController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateCardUseCase = container.resolve(UpdateCardUseCase);

    const { front, versus } = request.body;
    const { card_id } = request.params;

    const card = await updateCardUseCase.execute({
      front,
      versus,
      card_id,
    });

    return response.status(201).json(card);
  }
}
