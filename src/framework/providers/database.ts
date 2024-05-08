import { CONFIG } from 'config';
import { DataSource, DataSourceOptions } from 'typeorm';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(CONFIG.DB() as DataSourceOptions);

      return await dataSource.initialize();
    },
  },
];
