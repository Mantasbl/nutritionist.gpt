import { CONFIG } from '../../config'; // Assuming CONFIG is populated
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const dataSource = new DataSource(CONFIG.DB() as DataSourceOptions);
