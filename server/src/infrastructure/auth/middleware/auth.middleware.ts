import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['x-api-key'] as string;

    try {
      this.authService.validateApiKey(apiKey);
      next();
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }
}
