import { inject, injectable } from "tsyringe";
import AppError from "../../../../../shared/errors/AppError";
import ICardsRepository from "../../../repositories/ICardsRepository";
import IDecksRepository from "../../../repositories/IDecksRepository";

interface IRequest {
  deck_id: string;
  user_id: string;
}

@injectable()
export default class ListCardsUseCase {
  constructor(
    @inject("CardsRepository")
    private cardsRepository: ICardsRepository,
    @inject("DecksRepository")
    private decksRepository: IDecksRepository
  ) {}

  public async execute({ deck_id, user_id }: IRequest) {
    const deck = await this.decksRepository.findById(deck_id);

    if (!deck) throw new AppError("This deck does not exist", 404);
    if (deck.user_id !== user_id)
      throw new AppError("Unauthorizated user", 403);

    const cards = await this.cardsRepository.index(deck_id);

    return cards;
  }
}
