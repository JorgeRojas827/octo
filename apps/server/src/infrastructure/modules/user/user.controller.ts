import { UserUseCases } from '@application/user/user.use-cases';
import { IUser } from '@domain/user/interfaces/user.interface';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userUseCases: UserUseCases,
    private readonly prisma: PrismaService,
  ) {
    this.userUseCases = new UserUseCases(this.prisma);
  }

  @Get()
  async get() {
    return this.userUseCases.get();
  }

  @Post()
  async create(@Body() createBody: Partial<IUser>) {
    return this.userUseCases.create(createBody);
  }

  @Get('/:id')
  async getById(@Query() query: { id: string }) {
    return this.userUseCases.getById(query.id);
  }

  @Post('/:id')
  async update(
    @Query() query: { id: string },
    @Body() updateBody: Partial<IUser>,
  ) {
    return this.userUseCases.update(query.id, updateBody);
  }

  @Delete('/:id/delete')
  async delete(@Query() query: { id: string }) {
    return this.userUseCases.delete(query.id);
  }

  @Patch('/:id/upsert')
  async upsert(@Body() upsertBody: IUser) {
    return this.userUseCases.upsert(upsertBody);
  }
}
