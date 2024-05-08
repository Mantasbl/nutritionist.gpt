import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdParam {
  @ApiProperty({ type: String, example: 1 })
  @IsString()
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
