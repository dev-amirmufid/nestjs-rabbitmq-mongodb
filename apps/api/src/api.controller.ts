import {
  Controller,
  Get,
  Post,
  Inject,
  Body,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from '@auth/dtos';
import { CreateUserDto, UpdateUserDto } from '@users/dtos';
import { AuthGuard } from '@app/shared';

@Controller()
export class ApiController {
  constructor(
    @Inject('AUTH_SERVICE')
    private authService: ClientProxy,
    @Inject('USERS_SERVICE')
    private usersService: ClientProxy,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto, 'loginDto');
    return this.authService.send(
      {
        cmd: 'auth.login',
      },
      loginDto,
    );
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.send(
      {
        cmd: 'auth.register',
      },
      registerDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/getProfile')
  async getProfile(@Req() request) {
    return this.usersService.send(
      {
        cmd: 'users.getProfile',
      },
      { auth: request.auth },
    );
  }

  @UseGuards(AuthGuard)
  @Post('/createProfile')
  async createProfile(@Req() request, @Body() createUserDto: CreateUserDto) {
    return this.usersService.send(
      {
        cmd: 'users.createProfile',
      },
      { auth: request.auth, data: createUserDto },
    );
  }

  @UseGuards(AuthGuard)
  @Put('/updateProfile')
  async updateProfile(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.send(
      {
        cmd: 'users.updateProfile',
      },
      { auth: request.auth, data: updateUserDto },
    );
  }
}
