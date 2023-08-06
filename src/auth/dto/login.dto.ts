import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "user's email address",
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "user's password",
    example: 'Password@123',
  })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
