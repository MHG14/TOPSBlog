import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto';
import { AuthResponseType } from './dto/auth-response.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'returned JWT token as response to a new user signing up',
    type: AuthResponseType,
  })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'returned JWT token as response to a user logging in',
    type: AuthResponseType,
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
