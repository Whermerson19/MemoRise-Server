import { getRepository, Repository } from "typeorm";
import Deck from "../entities/Deck";

import ICreateDeckDTO from "../../../dtos/ICreateDeckDTO";
import IDecksRepository from "../../../repositories/IDecksRepository";

export default class DecksRepository implements IDecksRepository {
  private ormRepository: Repository<Deck>;

  constructor() {
    this.ormRepository = getRepository(Deck);
  }

  public async index(user_id: string): Promise<Deck[]> {
    const decks = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ["user"],
    });

    return decks;
  }

  public async findById(id: string): Promise<Deck | undefined> {
    const deck = await this.ormRepository.findOne(id);

    return deck;
  }

  public async findByTitle(title: string): Promise<Deck | undefined> {
    const deck = await this.ormRepository.findOne({ title });

    return deck;
  }

  public async create({
    title,
    subtitle,
    user_id,
  }: ICreateDeckDTO): Promise<Deck> {
    const deck = this.ormRepository.create({
      title,
      subtitle,
      user_id,
    });

    return this.ormRepository.save(deck);
  }

  public async save(deck: Deck): Promise<Deck> {
    return this.ormRepository.save(deck);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
