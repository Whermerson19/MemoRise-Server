import { v4 } from "uuid";

import Card from "../../infra/typeorm/entities/Card";

import ICreateCardDTO from "../../dtos/ICreateCardDTO";
import ICardsRepository from "../ICardsRepository";

export default class FakeCardsrRepository implements ICardsRepository {
  private cards: Card[] = [];

  public async findById(id: string): Promise<Card | undefined> {
    const card = this.cards.find((card) => card.id === id);

    return card;
  }

  public async create({
    front,
    versus,
    deck_id,
  }: ICreateCardDTO): Promise<Card> {
    const card = new Card();

    Object.assign(card, {
      id: v4(),
      front,
      versus,
      deck_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.cards.push(card);

    return card;
  }

  public async save(card: Card): Promise<Card> {
    return card;
  }
}
