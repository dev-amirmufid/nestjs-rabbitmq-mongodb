import { Module } from '@nestjs/common';
import { AuthController } from '@auth/controllers/auth.controller';
import { AuthService } from '@auth/services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from '@utils/unique.validator';
import { DataSource } from 'typeorm';
import { AuthEntity } from '@auth/entities';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule, DatabaseModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    DatabaseModule,
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
