import { IUserRepository } from '@domain/user/interfaces/user-repository.interface';

export interface IRepositories {
  userRepository: IUserRepository;
}
