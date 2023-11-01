import { Controller } from '@nestjs/common';
import { AuthService } from '@auth/services';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { RegisterDto } from '@auth/dto';
import { SharedService } from '@app/shared';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'auth.login' })
  async login(@Ctx() context: RmqContext, @Payload() payload) {
    this.sharedService.acknowledgeMessage(context);

    return { login: 'login 3', payload };
  }

  @MessagePattern({ cmd: 'auth.register' })
  async register(
    @Ctx() context: RmqContext,
    @Payload() registerDto: RegisterDto,
  ) {
    this.sharedService.acknowledgeMessage(context);

    try {
      await this.authService.register(registerDto);
      return { register: 'register', registerDto };
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
