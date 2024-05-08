import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationQuery {
  @ApiProperty({ required: false, example: 5 })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly skip?: number;

  @ApiProperty({ required: false, example: 5 })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly take?: number;

  constructor(skip?: number, take?: number) {
    this.skip = skip;
    this.take = take;
  }
}
