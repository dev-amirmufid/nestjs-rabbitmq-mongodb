import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from '@auth/dtos';

@Controller()
export class ApiController {
  constructor(
    @Inject('AUTH_SERVICE')
    private authService: ClientProxy,
    @Inject('PRESENCE_SERVICE')
    private presenceService: ClientProxy,
  ) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto, 'loginDto');
    return this.authService.send(
      {
        cmd: 'auth.login',
      },
      loginDto,
    );
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.send(
      {
        cmd: 'auth.register',
      },
      registerDto,
    );
  }

  @Get('/presence')
  getPresence() {
    console.log('getPresence');
    return this.presenceService.send(
      {
        cmd: 'presence.get',
      },
      { userId: 123 },
    );
  }
}
