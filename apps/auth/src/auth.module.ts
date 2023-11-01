import { Module } from '@nestjs/common';
import { AuthController } from '@auth/controllers/auth.controller';
import { AuthService } from '@auth/services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from '@utils/unique.validator';
import { DataSource } from 'typeorm';
import { AuthEntity } from '@auth/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_DB_USERNAME');
        const password = configService.get('MONGO_DB_PASSWORD');
        const database = configService.get('MONGO_DB_NAME');
        const host = configService.get('MONGO_DB_HOST');
        const port = configService.get('MONGO_DB_PORT');

        return {
          type: 'mongodb',
          host,
          port,
          username,
          password,
          database,
          authSource: 'admin',
          entities: [AuthEntity],
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, IsUniqueConstraint],
})
export class AuthModule {
  constructor(private dataSource: DataSource) {}
}
