import { IRepository } from '@domain/common/interfaces/repository-base.interface';
import { IUser } from './user.interface';

export interface IUserRepository extends IRepository<IUser> {}
