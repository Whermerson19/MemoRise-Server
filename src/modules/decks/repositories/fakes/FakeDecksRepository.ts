import { v4 } from "uuid";
import ICreateDeckDTO from "../../dtos/ICreateDeckDTO";
import Deck from "../../infra/typeorm/entities/Deck";
import IDecksRepository from "../IDecksRepository";

export default class FakeDecksRepository implements IDecksRepository {
  private decks: Deck[] = [];

  public async findById(id: string): Promise<Deck | undefined> {
    const deck = this.decks.find((deck) => deck.id === id);

    return deck;
  }

  public async findByTitle(title: string): Promise<Deck | undefined> {
    const deck = this.decks.find((deck) => deck.title === title);

    return deck;
  }

  public async create({ title, subtitle }: ICreateDeckDTO): Promise<Deck> {
    const deck = new Deck();

    Object.assign(deck, {
      id: v4(),
      title,
      subtitle,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.decks.push(deck);

    return deck;
  }

  public async save(deck: Deck): Promise<Deck> {
    return deck;
  }
}
