import ICreateDeckDTO from "../dtos/ICreateDeckDTO";
import Deck from "../infra/typeorm/entities/Deck";

export default interface IDecksRepository {
  index(user_id: string): Promise<Deck[]>;
  findById(id: string): Promise<Deck | undefined>;
  findByTitle(title: string): Promise<Deck | undefined>;
  create(data: ICreateDeckDTO): Promise<Deck>;
  save(deck: Deck): Promise<Deck>;
}