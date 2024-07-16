import { catchError } from '@application/common/handler-error';
import { IUserRepository } from '@domain/user/interfaces/user-repository.interface';
import { IUser } from '@domain/user/interfaces/user.interface';
import { UserDomainService } from '@domain/user/services/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserApplicationService {
  userService: UserDomainService;

  constructor(private readonly userRepository: IUserRepository) {
    this.userService = new UserDomainService(this.userRepository);
  }

  create(user: Partial<IUser>) {
    return catchError(this.userService.create(user));
  }

  getById(id: string) {
    return catchError(this.userService.getById(id));
  }

  get() {
    return catchError(this.userService.get());
  }

  update(id: string, user: Partial<IUser>) {
    return catchError(this.userService.update(id, user));
  }

  delete(id: string) {
    return catchError(this.userService.delete(id));
  }

  upsert(userData: IUser) {
    return catchError(this.userService.upsert(userData));
  }
}
