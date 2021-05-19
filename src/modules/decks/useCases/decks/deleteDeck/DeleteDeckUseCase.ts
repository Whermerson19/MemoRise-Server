import { inject, injectable } from "tsyringe";
import AppError from "../../../../../shared/errors/AppError";
import IDecksRepository from "../../../repositories/IDecksRepository";

@injectable()
export default class DeleteDeckUseCase {
  constructor(
    @inject("DecksRepository")
    private decksRepository: IDecksRepository
  ) {}

  public async execute(deck_id: string): Promise<void> {
    const deck = await this.decksRepository.findById(deck_id);
    if (!deck) throw new AppError("This deck does not exist", 404);

    await this.decksRepository.delete(deck_id);
  }
}
