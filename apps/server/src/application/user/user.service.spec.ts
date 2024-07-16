import { Test, TestingModule } from '@nestjs/testing';
import { UserApplicationService } from './user.service';

describe('UserApplicationService', () => {
  let service: UserApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserApplicationService],
    }).compile();

    service = module.get<UserApplicationService>(UserApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
