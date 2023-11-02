import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  constructor(private dataSource: DataSource) {}
}
