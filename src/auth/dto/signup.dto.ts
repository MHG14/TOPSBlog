import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;


  @IsString()
  @IsNotEmpty()
  firstName: string;

  
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
