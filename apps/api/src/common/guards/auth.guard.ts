import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '../utils/tokens.util';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { FastifyRequest } from 'fastify';
import { PrismaService, User } from '@ecorally/dal';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = ctx.switchToHttp().getRequest();
    const accessToken: string | undefined = request.headers.authorization;

    if (!accessToken) {
      throw new UnauthorizedException('Access token not provided');
    }

    try {
      const token = accessToken.startsWith('Bearer ') ? accessToken.slice(7) : accessToken;

      const id = verifyToken(token);
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      request.user = User.fromPersistence(user);
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Access token has expired');
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Access token is not valid');
      }

      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid authentication');
    }
  }
}
