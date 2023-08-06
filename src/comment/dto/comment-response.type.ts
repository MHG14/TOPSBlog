import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseType {
  @ApiProperty({
    description: 'id of the returned comment',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'date in which the returned comment was created',
    example: '2023-08-04T17:47:30.465Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'date in which the returned comment was edited',
    example: '2023-08-04T17:47:30.465Z',
  })
  updatedAt: Date;
  @ApiProperty({
    description: 'content of the returned comment',
    example: '2023-08-04T17:47:30.465Z',
  })
  content: string;
  @ApiProperty({
    description: "id of the returned comment's user",
    example: 2,
  })
  userId: number;
  @ApiProperty({
    description: 'id of the post which the returned comment is related to',
    example: 2,
  })
  postId: number;
}
