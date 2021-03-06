import ICreateCardDTO from "../dtos/ICreateCardDTO";
import Card from "../infra/typeorm/entities/Card";

export default interface ICardsRepository {
  index(deck_id: string): Promise<Card[]>;
  findById(id: string): Promise<Card | undefined>;
  create(data: ICreateCardDTO): Promise<Card>;
  save(card: Card): Promise<Card>;
  delete(id: string): Promise<void>;
}