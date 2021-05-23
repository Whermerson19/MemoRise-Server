import { inject, injectable } from "tsyringe";
import IStorageProvider from "../../../../../shared/container/providers/storageProvider/IStorageProvider";
import AppError from "../../../../../shared/errors/AppError";
import User from "../../../infra/typeorm/entities/User";
import IUsersRepository from "../../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageRepository: IStorageProvider
  ) {}

  public async execute({ user_id, avatar }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError("This user does not exist", 403);

    if (user.avatar) {
      await this.storageRepository.deleteFile(user.avatar, "avatar");
    }

    const file = await this.storageRepository.saveFile(avatar, "avatar");

    user.avatar = file;

    return this.usersRepository.save(user);
  }
}
