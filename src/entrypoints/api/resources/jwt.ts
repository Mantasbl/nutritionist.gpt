import { ApiProperty } from '@nestjs/swagger';

export class JwtResource {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjQHlhaG9vLmVkdSIsImlkIjozLCJpYXQiOjE3MTUwMDY2NjUsImV4cCI6MTcxNTA0OTg2NX0.ahAwJZ7PXppcBxNlJSp04U7oQzufI1X_PQ6IMHB20dg',
  })
  readonly access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
