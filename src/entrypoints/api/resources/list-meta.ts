import { ApiProperty } from '@nestjs/swagger';
import { FindMeta } from 'domain/types/find-result';

export class ListMetaResource {
  @ApiProperty({ example: 1 })
  readonly skip: number;

  @ApiProperty({ example: 10 })
  readonly take: number;

  @ApiProperty({ example: 10 })
  readonly total: number;

  @ApiProperty({ example: 2 })
  readonly pages: number;

  @ApiProperty({ example: 1 })
  readonly page: number;

  constructor(skip: number, take: number, total: number, pages: number, page: number) {
    this.skip = skip;
    this.take = take;
    this.total = total;
    this.pages = pages;
    this.page = page;
  }

  static from(meta: FindMeta): ListMetaResource {
    return new ListMetaResource(meta.skip, meta.take, meta.total, meta.pages, meta.page);
  }
}
