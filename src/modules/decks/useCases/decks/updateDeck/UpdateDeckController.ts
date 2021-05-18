import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateDeckUseCase from "./UpdateDeckUseCase";

export default class UpdateDeckController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateDeckUseCase = container.resolve(UpdateDeckUseCase);

    const { list_id } = request.params;

    const { title, subtitle } = request.body;

    const deck = await updateDeckUseCase.execute({
      list_id,
      title,
      subtitle,
    });

    return response.status(200).json(deck);
  }
}
