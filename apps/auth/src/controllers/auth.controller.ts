import { Controller, BadGatewayException } from '@nestjs/common';
import { AuthService } from '@auth/services';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { RegisterDto } from '@auth/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.login' })
  async login(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    channel.ack(message);

    return { login: 'login' };
  }

  @MessagePattern({ cmd: 'auth.register' })
  async register(
    @Ctx() context: RmqContext,
    @Payload() registerDto: RegisterDto,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
    try {
      return this.authService.register(registerDto);
    } catch (err) {
      throw new BadGatewayException(err.message);
    }
  }
}
