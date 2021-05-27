import { getRepository, Repository } from "typeorm";
import IUsersTokensRepository from "../../../repositories/IUsersTokensRepository";
import UsersTokens from "../entities/UsersTokens";

export default class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UsersTokens>;

  constructor() {
    this.ormRepository = getRepository(UsersTokens);
  }

  public async create(user_id: string): Promise<UsersTokens> {
    const user_token = this.ormRepository.create({
      user_id,
    });

    return this.ormRepository.save(user_token);
  }
}
