import { IUserRepository } from '@domain/user/interfaces/user-repository.interface';
import { IUser } from '@domain/user/interfaces/user.interface';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async upsert(userData: IUser) {
    const { email, username, accessToken, githubId } = userData;

    return await this.prisma.user.upsert({
      where: { githubId },
      update: {
        email,
        username,
        accessToken,
        lastActiveAt: new Date(),
      },
      create: {
        githubId,
        email,
        username,
        accessToken,
        lastActiveAt: new Date(),
      },
    });
  }

  async update(id: string, userData: IUser) {
    const { email, username, accessToken } = userData;

    return await this.prisma.user.update({
      where: { id },
      data: {
        email,
        username,
        accessToken,
        lastActiveAt: new Date(),
      },
    });
  }

  async create(userData: IUser) {
    const { githubId, email, username, accessToken } = userData;

    return await this.prisma.user.create({
      data: {
        githubId,
        email,
        username,
        accessToken,
        lastActiveAt: new Date(),
      },
    });
  }

  async getByEntityId(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async get() {
    return await this.prisma.user.findMany();
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
