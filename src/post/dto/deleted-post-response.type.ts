import { ApiProperty } from '@nestjs/swagger';

export class DeletedPostResponse {
  @ApiProperty({
    description: "a messge for as a deleted post's response",
    example: 'post deleted successfully',
  })
  msg: string;
}
