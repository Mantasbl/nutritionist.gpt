import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { CONFIG } from '../../config'; // Assuming CONFIG is populated

dotenv.config({ path: './.env' });

export const dataSource = new DataSource(CONFIG.DB() as DataSourceOptions);
