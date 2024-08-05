import { IUserRepository } from '@domain/user/interfaces/user-repository.interface';
import { IUser } from '@domain/user/interfaces/user.interface';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async upsert(userData: IUser) {
    const { email, username, githubId, fullName, accessToken } = userData;

    const info = {
      email,
      username,
      fullName: fullName || '',
      lastActiveAt: new Date(),
      accessToken,
    };

    return await this.prisma.user.upsert({
      where: { githubId },
      update: info,
      create: {
        githubId,
        ...info,
      },
    });
  }

  async update(id: string, userData: IUser) {
    const { email, username } = userData;

    return await this.prisma.user.update({
      where: { id },
      data: {
        email,
        username,
        lastActiveAt: new Date(),
      },
    });
  }

  async create(userData: IUser) {
    const { githubId, email, username, fullName, accessToken } = userData;

    return await this.prisma.user.create({
      data: {
        githubId,
        email,
        username,
        fullName,
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
