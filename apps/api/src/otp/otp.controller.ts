import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CheckOtpDto } from './infrastructure/dto/check-otp.dto';
import { FastifyRequest } from 'fastify';
import { User } from '@prisma/client';
import { SendOtpDto } from './infrastructure/dto/send-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  @ApiOperation({
    summary: 'Create OTP',
    description:
      'Creates a one time password (OTP) for the user and sends it via email.',
  })
  @ApiResponse({
    status: 200,
    description: 'Otp was successfully generated and sent',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Message text' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Access token not provided or has expired',
  })
  @ApiResponse({
    status: 400,
    description: 'Access token is not valid',
  })
  async sendOtp(@Body() data: SendOtpDto) {
    return this.otpService.generateAndSendOtp(data.email);
  }

  @Post('check')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Check OTP',
    description: ' Checks the one time password for the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Provided OTP is valid',
    schema: {
      type: 'object',
      properties: {
        isValid: { type: 'boolean', description: 'Is valid provided OTP' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Access token not provided or has expired',
  })
  @ApiResponse({
    status: 400,
    description: 'Access token or provided data is not valid',
  })
  @ApiResponse({
    status: 404,
    description: 'Otp for this user not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Provided code is not valid',
  })
  async checkOtp(
    @Body(ValidationPipe) data: CheckOtpDto,
    @Req() req: FastifyRequest,
  ) {
    const user = req.user as User;
    return this.otpService.checkOtp(data.code, user.id);
  }
}
