import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsArray()
  tags: string[];
}
