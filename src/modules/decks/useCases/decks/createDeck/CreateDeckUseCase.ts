import { inject, injectable } from "tsyringe";

import Deck from "../../../infra/typeorm/entities/Deck";

import IDecksRepository from "../../../repositories/IDecksRepository";
import AppError from "../../../../../shared/errors/AppError";

interface IRequest {
  user_id: string;
  title: string;
  subtitle?: string;
}

@injectable()
export default class CreateDeckUseCase {
  constructor(
    @inject("DecksRepository")
    private decksRepository: IDecksRepository
  ) {}

  public async execute({ title, subtitle, user_id }: IRequest): Promise<Deck> {

    const titleAlreadyExists = await this.decksRepository.findByTitle(title);

    if (titleAlreadyExists)
      throw new AppError("This title is already in use")

    const deck = await this.decksRepository.create({
      title,
      subtitle,
      user_id
    });

    return this.decksRepository.save(deck);
  }
}
