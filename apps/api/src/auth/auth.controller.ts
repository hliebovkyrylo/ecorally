import { Body, Controller, Patch, Post, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case';
import { SignUpCommand } from './application/commands/sign-up.command';
import { SignInCommand } from './application/commands/sign-in.command';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { RefreshTokensUseCase } from './application/use-cases/refresh-tokens.use-case';
import { RefreshTokensCommand } from './application/commands/refresh-token.command';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';
import { ResetPasswordCommand } from './application/commands/reset-password.command';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly refreshTokensUseCase: RefreshTokensUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post('sign-up')
  @ApiOperation({
    summary: 'Sign up a new user',
    description:
      'Creates a new user account and returns an access token. A refresh token is set as an HTTP-only cookie.',
  })
  @ApiBody({ type: SignUpDto, description: 'User sign-up data' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed up',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', description: 'JWT access token' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async signUp(@Body() data: SignUpDto, @Res() res: FastifyReply) {
    const result = await this.signUpUseCase.execute(SignUpCommand.create(data));

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.send({ accessToken: result.accessToken });
  }

  @Post('sign-in')
  @ApiOperation({
    summary: 'Sign in a user',
    description:
      'Authenticates a user and returns an access token. A refresh token is set as an HTTP-only cookie.',
  })
  @ApiBody({ type: SignInDto, description: 'User sign-in credentials' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', description: 'JWT access token' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async signIn(@Body() data: SignInDto, @Res() res: FastifyReply) {
    const result = await this.signInUseCase.execute(SignInCommand.create(data));

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.send({ accessToken: result.accessToken });
  }

  @Post('refresh-token')
  async refreshToken(@Res() res: FastifyReply, @Req() req: FastifyRequest) {
    const accessToken = req.headers['authorization'];
    const refreshToken = req.cookies.refreshToken;
    const result = await this.refreshTokensUseCase.execute(
      RefreshTokensCommand.create({ accessToken, refreshToken }),
    );

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.send({
      accessToken: result.accessToken,
    });
  }

  @Patch('reset-password')
  @ApiOperation({
    summary: 'Reset your own password',
    description: 'If the user has forgotten his password, he can reset it.',
  })
  @ApiBody({ type: ResetPasswordDto, description: 'Reset password data' })
  @ApiResponse({
    status: 200,
    description: 'User successfully reset his password',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Password was successfully updated',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Provided code is invalid' })
  async resetPassword(@Res() res: FastifyReply, @Body() data: ResetPasswordDto) {
    const result = await this.resetPasswordUseCase.execute(ResetPasswordCommand.create(data));

    res.send({ message: result });
  }
}
