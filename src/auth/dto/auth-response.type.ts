import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseType {
  @ApiProperty({
    description: 'access token returned to new registered or logged in users',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoibW9oYW1hZGhhc2FuZ2hhbWFyaTNAeWFob28uY29tIiwiaWF0IjoxNjkxMzI1NDg3LCJleHAiOjE2OTEzNzk0ODd9.r_W5eNYbYuW8_TECP5LliGM4Acj5Y9wZ1wXinHksb2A',
  })
  access_token: string;
}
