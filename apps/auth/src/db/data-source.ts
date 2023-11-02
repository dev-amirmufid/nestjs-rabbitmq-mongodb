import { AuthEntity } from '@auth/entities';
import { UsersEntity } from '@users/entities';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  host: process.env.MONGO_DB_HOST,
  port: parseInt(process.env.MONGO_DB_PORT),
  username: process.env.MONGO_DB_USERNAME,
  password: process.env.MONGO_DB_PASSWORD,
  database: process.env.MONGO_DB_NAME,
  authSource: 'admin',
  entities: [AuthEntity, UsersEntity],
  synchronize: true,
};

export const dataSource = new DataSource(dataSourceOptions);
