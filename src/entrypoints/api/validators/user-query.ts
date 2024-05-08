import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserQuery {
  @ApiProperty({ type: String, example: 'What can you do?' })
  @IsNotEmpty()
  @IsString()
  query: string;

  constructor(query: string) {
    this.query = query;
  }
}
