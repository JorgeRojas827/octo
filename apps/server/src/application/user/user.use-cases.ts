import { UserApplicationService } from './user.service';
import { IUser } from '@domain/user/interfaces/user.interface';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';

export class UserUseCases {
  userService: UserApplicationService;
  userRepository: UserRepository;

  constructor(readonly prisma: PrismaService) {
    this.userRepository = new UserRepository(this.prisma);
    this.userService = new UserApplicationService(this.userRepository);
  }

  create(data: Partial<IUser>) {
    return this.userService.create(data);
  }

  getById(id: string) {
    return this.userService.getById(id);
  }

  get() {
    return this.userService.get();
  }

  update(id: string, data: Partial<IUser>) {
    return this.userService.update(id, data);
  }

  delete(id: string) {
    return this.userService.delete(id);
  }

  upsert(data: IUser) {
    return this.userService.upsert(data);
  }
}
