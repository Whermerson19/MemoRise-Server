import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import ListCardsUseCase from "./ListCardsUseCase";

export default class ListCardsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listCardsUseCase = container.resolve(ListCardsUseCase);

    const user_id = request.user.id;
    const { deck_id } = request.params;

    const cards = await listCardsUseCase.execute({
      user_id,
      deck_id,
    });

    return response.status(200).json(classToClass(cards));
  }
}
