import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UnauthorizedException, Logger } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        Logger,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-api-key'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a correct API key', () => {
    expect(() => service.validateApiKey('test-api-key')).not.toThrow();
  });

  it('should throw an error if API key is missing', () => {
    expect(() => service.validateApiKey('')).toThrow(UnauthorizedException);
  });

  it('should throw an error if API key is invalid', () => {
    expect(() => service.validateApiKey('invalid-api-key')).toThrow(
      UnauthorizedException,
    );
  });
});
