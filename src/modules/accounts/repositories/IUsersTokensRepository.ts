import UsersTokens from "../infra/typeorm/entities/UsersTokens";

export default interface IUsersTokensRepository {
  create(user_id: string): Promise<UsersTokens>;
  findByToken(token: string): Promise<UsersTokens | undefined>;
  delete(id: string): Promise<void>;
}