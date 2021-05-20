import { inject, injectable } from "tsyringe";
import AppError from "../../../../../shared/errors/AppError";
import ICardsRepository from "../../../repositories/ICardsRepository";

@injectable()
export default class DeleteCardUseCase {
  constructor(
    @inject("CardsRepository")
    private cardsRepository: ICardsRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const card = await this.cardsRepository.findById(id);
    if (!card) throw new AppError("This card does not exists", 404);

    await this.cardsRepository.delete(id);
  }
}
