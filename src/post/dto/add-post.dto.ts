import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddPostDto {
  @ApiProperty({
    description: 'title of a blog post',
    example: 'Node js async mechanisms',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'content of a blog post',
    example: 'Some text about node js async mechanisms',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'tags related to a blog post',
    example: ['node.js', 'async'],
  })
  @IsOptional()
  @IsArray()
  tags: string[];
}
