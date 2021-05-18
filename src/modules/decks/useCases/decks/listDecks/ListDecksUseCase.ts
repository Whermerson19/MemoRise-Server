import { inject, injectable } from "tsyringe";
import Deck from "../../../infra/typeorm/entities/Deck";
import IDecksRepository from "../../../repositories/IDecksRepository";

@injectable()
export default class ListDecksUseCase {
  constructor(
    @inject("DecksRepository")
    private decksRepository: IDecksRepository
  ) {}

  public async execute(user_id: string): Promise<Deck[]> {
    const decks = await this.decksRepository.index(user_id);

    return decks;
  }
}
