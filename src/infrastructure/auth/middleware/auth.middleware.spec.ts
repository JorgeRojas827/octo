import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from '../service/auth.service';
import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthMiddleware,
        {
          provide: AuthService,
          useValue: {
            validateApiKey: jest.fn(),
          },
        },
      ],
    }).compile();

    middleware = module.get<AuthMiddleware>(AuthMiddleware);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should call validateApiKey and pass on valid API key', () => {
    const req = {
      headers: {
        'api-key': 'test-api-key',
      },
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    authService.validateApiKey = jest.fn().mockImplementation(() => true);

    middleware.use(req, res, next);

    expect(authService.validateApiKey('test-api-key'));
    expect(next).toHaveBeenCalled();
  });

  it('should throw an error if API key is missing', () => {
    const req = {
      headers: {},
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const next = jest.fn();

    authService.validateApiKey = jest.fn().mockImplementation(() => {
      throw new UnauthorizedException('API key is missing');
    });

    middleware.use(req, res, next);

    expect(authService.validateApiKey).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ message: 'API key is missing' });
    expect(next).not.toHaveBeenCalled();
  });
});
