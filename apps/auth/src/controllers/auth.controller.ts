import { Controller } from '@nestjs/common';
import { AuthService } from '@auth/services';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { LoginDto, RegisterDto } from '@auth/dtos';
import { SharedService } from '@app/shared';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'auth.login' })
  async login(@Ctx() context: RmqContext, @Payload() loginDto: LoginDto) {
    this.sharedService.acknowledgeMessage(context);

    try {
      return await this.authService.login(loginDto);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @MessagePattern({ cmd: 'auth.register' })
  async register(
    @Ctx() context: RmqContext,
    @Payload() registerDto: RegisterDto,
  ) {
    this.sharedService.acknowledgeMessage(context);

    try {
      return await this.authService.register(registerDto);
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
