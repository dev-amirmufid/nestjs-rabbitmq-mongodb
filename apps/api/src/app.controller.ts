import { RegisterDto } from '@auth/dto';
import { Controller, Get, Post, Inject, Res, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private authService: ClientProxy,
  ) {}

  @Get()
  login() {
    console.log('auth-login 2');
    return this.authService.send(
      {
        cmd: 'auth.login',
      },
      { userId: 123 },
    );
  }

  @Post('/register')
  register(@Res() response, @Body() registerDto: RegisterDto) {
    return this.authService.send(
      {
        cmd: 'auth.register',
      },
      registerDto,
    );
  }
}
