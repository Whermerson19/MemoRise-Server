import { getRepository, Repository } from "typeorm";

import Card from "../entities/Card";

import ICardsRepository from "../../../repositories/ICardsRepository";
import ICreateCarDTO from "../../../dtos/ICreateCardDTO";

export default class CardsRepository implements ICardsRepository {
  private ormRepository: Repository<Card>;

  constructor() {
    this.ormRepository = getRepository(Card);
  }

  public async findById(id: string): Promise<Card | undefined> {
    const card = await this.ormRepository.findOne(id);

    return card;
  }

  public async index(deck_id: string): Promise<Card[]> {
    return this.ormRepository.find({
      where: {
        deck_id,
      },
      relations: ["deck", "user"],
    });
  }

  public async create({
    front,
    versus,
    deck_id,
    user_id,
  }: ICreateCarDTO): Promise<Card> {
    const card = this.ormRepository.create({
      front,
      versus,
      deck_id,
      user_id,
    });

    return this.ormRepository.save(card);
  }

  public async save(card: Card): Promise<Card> {
    return this.ormRepository.save(card);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
