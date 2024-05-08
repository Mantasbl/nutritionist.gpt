export class FindResult<T> {
  readonly data: T[];

  readonly meta: FindMeta;

  constructor(result: [T[], number], skip?: number, take?: number) {
    const [data, total] = result;

    const defaultTake = take ?? data.length;
    const defaultSkip = skip ?? 0;

    const pages = defaultTake > 0 ? Math.ceil(total / defaultTake) : 0;
    const page = defaultTake > 0 ? Math.ceil((defaultSkip - 1) / defaultTake) + 1 : 0;

    this.data = data;

    this.meta = {
      total,
      skip: defaultSkip,
      take: defaultTake,
      pages,
      page,
    };
  }
}

export interface FindMeta {
  readonly total: number;

  readonly pages: number;

  readonly page: number;

  readonly skip: number;

  readonly take: number;
}
