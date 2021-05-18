import { inject, injectable } from "tsyringe";
import Deck from "../../../infra/typeorm/entities/Deck";

import IDecksRepository from "../../../repositories/IDecksRepository";

import AppError from "../../../../../shared/errors/AppError";

interface IRequest {
  list_id: string;
  title: string;
  subtitle?: string;
}

@injectable()
export default class UpdateDeckUseCase {
  constructor(
    @inject("DecksRepository")
    private decksRepository: IDecksRepository
  ) {}

  public async execute({ list_id, title, subtitle }: IRequest): Promise<Deck> {
    const deck = await this.decksRepository.findById(list_id);

    if (!deck) throw new AppError("This deck does not exist", 404);

    const titleAlreadyExist = await this.decksRepository.findByTitle(title);

    if (titleAlreadyExist && title !== deck.title)
      throw new AppError("This title is already in use");

    deck.title = title;

    if (subtitle) deck.subtitle = subtitle;

    return this.decksRepository.save(deck);
  }
}
