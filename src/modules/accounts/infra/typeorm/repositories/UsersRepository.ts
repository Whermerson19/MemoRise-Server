import { Repository, getRepository } from "typeorm";

import User from "../entities/User";

import IUsersRepository from "../../../repositories/IUsersRepository";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findUser(field: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: [{ username: field }, { email: field }],
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
  public async create({
    name,
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      username,
      email,
      password,
    });

    return this.ormRepository.save(user);
  }
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
