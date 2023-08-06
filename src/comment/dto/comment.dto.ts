import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty({
    description: "content of a user's comment",
    example: 'that was a great post!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
