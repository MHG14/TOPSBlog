import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto';
import { AuthResponseType } from './dto/auth-response.type';
import { Logger } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'returned JWT token as response to a new user signing up',
    type: AuthResponseType,
  })
  signup(@Body() dto: SignupDto) {
    try {
      return this.authService.signup(dto);
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'returned JWT token as response to a user logging in',
    type: AuthResponseType,
  })
  login(@Body() dto: LoginDto) {
    try {
      return this.authService.login(dto);
    } catch (error) {
      this.logger.warn(error.message);
      throw error;
    }
  }
}
