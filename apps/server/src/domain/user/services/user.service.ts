import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import { IUser } from '../interfaces/user.interface';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserDomainService {
  userModel: UserModel;

  constructor(private readonly userRepository: IUserRepository) {
    this.userModel = new UserModel(this.userRepository);
  }

  create(user: Partial<IUser>) {
    return this.userModel.create(user);
  }

  getById(id: string) {
    return this.userModel.getById(id);
  }

  get() {
    return this.userModel.get();
  }

  update(id: string, user: Partial<IUser>) {
    return this.userModel.update(id, user);
  }

  delete(id: string) {
    return this.userModel.delete(id);
  }

  upsert(userData: IUser) {
    return this.userModel.upsert(userData);
  }
}
