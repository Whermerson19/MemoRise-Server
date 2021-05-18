import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import ListDecksUseCase from "./ListDecksUseCase";

export default class ListDecksController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listDecksUseCase = container.resolve(ListDecksUseCase);

    const user_id = request.user.id;

    const decks = await listDecksUseCase.execute(user_id);

    return response.status(200).json(classToClass(decks));
  }
}
