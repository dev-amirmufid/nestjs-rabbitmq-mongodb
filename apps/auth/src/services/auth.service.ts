import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthEntity } from '@auth/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { LoginDto, RegisterDto } from '@auth/dtos';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly AuthRepository: MongoRepository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<object> {
    const account = await this.AuthRepository.findOneBy({
      $or: [{ username: loginDto.username }, { email: loginDto.username }],
    });

    if (!account) {
      throw new UnauthorizedException(`Wrong username or password`);
    }

    const isMatch = await bcrypt.compare(loginDto.password, account.password);
    if (!isMatch) {
      throw new UnauthorizedException(`Wrong username or password`);
    }

    const payload = {
      sub: account.id,
      username: account.username,
      email: account.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerDto.password, saltOrRounds);

    const newAccount = await this.AuthRepository.save({
      username: registerDto.username,
      email: registerDto.email,
      password: hash,
    });
    return newAccount;
  }
}
