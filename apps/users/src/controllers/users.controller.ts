import { Controller, BadGatewayException } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { UsersService } from '@users/services';
import { CreateUserDto, UpdateUserDto } from '@users/dtos';
import { getAge, getHoroscope, getZodiac } from '@utils/dates.helper';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'users.getProfile' })
  async getProfile(@Ctx() context: RmqContext, @Payload() payload) {
    this.sharedService.acknowledgeMessage(context);
    const auth = payload.auth;
    const userData = await this.usersService.getUser(auth.sub);

    const age = getAge(userData.birthday);

    return {
      zodiac: getZodiac(userData.birthday),
      hosorsope: getHoroscope(userData.birthday),
      age: age,
      ...userData,
    };
  }

  @MessagePattern({ cmd: 'users.createProfile' })
  async createProfile(@Ctx() context: RmqContext, @Payload() payload) {
    this.sharedService.acknowledgeMessage(context);
    const auth = payload.auth;
    const data: CreateUserDto = payload.data;
    try {
      return await this.usersService.createUser(auth.sub, data);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @MessagePattern({ cmd: 'users.updateProfile' })
  async updateProfile(@Ctx() context: RmqContext, @Payload() payload) {
    this.sharedService.acknowledgeMessage(context);
    const auth = payload.auth;
    const data: UpdateUserDto = payload.data;
    try {
      return await this.usersService.updateUser(auth.sub, data);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }
}
