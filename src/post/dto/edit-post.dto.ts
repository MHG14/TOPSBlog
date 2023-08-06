import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditPostDto {
  @ApiProperty({
    description: 'title of a blog post',
    example: 'Node js async mechanisms',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'content of a blog post',
    example: 'Some text about node js async mechanisms',
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    description: 'tags related to a blog post',
    example: ['node.js', 'async'],
  })
  @IsOptional()
  @IsArray()
  tags: string[];
}
