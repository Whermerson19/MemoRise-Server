import { inject, injectable } from "tsyringe";
import AppError from "../../../../../shared/errors/AppError";
import Card from "../../../infra/typeorm/entities/Card";
import ICardsRepository from "../../../repositories/ICardsRepository";
import IDecksRepository from "../../../repositories/IDecksRepository";

interface IRequest {
  front: string;
  versus: string;
  deck_id: string;
}

@injectable()
export default class CreateCardUseCase {
  constructor(
    @inject("DecksRepository")
    private decksRepository: IDecksRepository,
    @inject("CardsRepository")
    private cardsRepository: ICardsRepository
  ) {}

  public async execute({ front, versus, deck_id }: IRequest): Promise<Card> {
    const deck = await this.decksRepository.findById(deck_id);
    if (!deck) throw new AppError("Invali deck");

    const card = await this.cardsRepository.create({
      front,
      versus,
      deck_id,
    });

    return card;
  }
}
