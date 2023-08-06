import { ApiProperty } from '@nestjs/swagger';

export class DeletedCommentResponse {
  @ApiProperty({
    description: "a messge for as a deleted comment's response",
    example: 'comment deleted successfully',
  })
  msg: string;
}
