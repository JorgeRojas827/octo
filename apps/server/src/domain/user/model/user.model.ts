import { IUserRepository } from '@domain/user/interfaces/user-repository.interface';
import { IUser } from '../interfaces/user.interface';

export class UserModel {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  create(user: Partial<IUser>) {
    return this.userRepository.create(user);
  }

  getById(userId: string) {
    return this.userRepository.getByEntityId(userId);
  }

  get() {
    return this.userRepository.get();
  }

  update(userId: string, user: Partial<IUser>) {
    return this.userRepository.update(userId, user);
  }

  delete(userId: string) {
    return this.userRepository.delete(userId);
  }

  upsert(userData: IUser) {
    return this.userRepository.upsert(userData);
  }
}
