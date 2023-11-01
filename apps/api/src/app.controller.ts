import { Controller, Get, Post, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private authService: ClientProxy,
    @Inject('PRESENCE_SERVICE')
    private presenceService: ClientProxy,
  ) {}

  @Get('login')
  login() {
    console.log('auth-login 2');
    return this.authService.send(
      {
        cmd: 'auth.login',
      },
      { userId: 123 },
    );
  }

  @Post('register')
  register() {
    return this.authService.send(
      {
        cmd: 'auth.register',
      },
      {
        username: 'amirmufid',
        email: 'amirmufid.forbid@gmail.com',
        password: '1234',
        confirm_password: '1234',
      },
    );
  }

  @Get('presence')
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
