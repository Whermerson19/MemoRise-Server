import { Request, Response } from "express";
import { container } from "tsyringe";

import DeleteDeckUseCase from "./DeleteDeckUseCase";

export default class DeleteDeckController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const deleteDeckUseCase = container.resolve(DeleteDeckUseCase);

    const { id } = request.params;

    await deleteDeckUseCase.execute(id);

    return response.status(200).send();
  }
}
