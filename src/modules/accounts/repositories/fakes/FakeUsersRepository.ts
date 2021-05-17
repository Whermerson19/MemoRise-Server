import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../infra/typeorm/entities/User";
import IUsersRepository from "../IUsersRepository";

import { v4 } from "uuid";

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findUser(field: string): Promise<User | undefined> {
    const user = this.users.find(
      (user) => user.username === field || user.email === field
    );

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  public async create({
    name,
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      name,
      username,
      email,
      password,
      admin: false,
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }
  public async save(user: User): Promise<User> {
    return user;
  }
}
