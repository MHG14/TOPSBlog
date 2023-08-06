import { ApiProperty } from '@nestjs/swagger';

export class PostResponseType {
  @ApiProperty({
    description: 'id of the returned post',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'date of the returned post publication',
    example: '2023-08-04T17:47:30.465Z',
  })
  publishedAt: Date;
  @ApiProperty({
    description: 'date in which the returned post was edited',
    example: '2023-08-04T17:47:30.465Z',
  })
  updatedAt: Date;
  @ApiProperty({
    description: 'title of the returned post',
    example: 'node js async mechanisms',
  })
  title: string;
  @ApiProperty({
    description: 'content of the returned post',
    example: 'some text about node js async mechanisms',
  })
  content: string;
  @ApiProperty({
    description: "id of the returned post's author",
    example: 1,
  })
  authorId: number;
  @ApiProperty({
    description: 'an array of tags related to the returned post',
    example: ['node js', 'async'],
  })
  tags: Array<string>;
}
