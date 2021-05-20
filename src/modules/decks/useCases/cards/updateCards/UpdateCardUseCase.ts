import { inject, injectable } from "tsyringe";
import AppError from "../../../../../shared/errors/AppError";
import Card from "../../../infra/typeorm/entities/Card";
import ICardsRepository from "../../../repositories/ICardsRepository";

interface IRequest {
  front: string;
  versus: string;
  card_id: string;
}

@injectable()
export default class UpdateCardUseCase {
  constructor(
    @inject("CardsRepository")
    private cardsRepository: ICardsRepository
  ) {}

  public async execute({ front, versus, card_id }: IRequest): Promise<Card> {
    const card = await this.cardsRepository.findById(card_id);

    if (!card) throw new AppError("This card does not exists", 404);

    card.front = front;
    card.versus = versus;

    return this.cardsRepository.save(card);
  }
}
