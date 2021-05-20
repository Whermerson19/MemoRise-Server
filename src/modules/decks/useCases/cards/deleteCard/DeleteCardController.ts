import { Request, Response } from "express";
import { container } from "tsyringe";
import DeleteCardUseCase from "./DeleteCardUseCase";

export default class DeleteCardController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const deleteCardUseCase = container.resolve(DeleteCardUseCase);

    const id = request.params.card_id;

    await deleteCardUseCase.execute(id);

    return response.status(200).send();
  }
}
