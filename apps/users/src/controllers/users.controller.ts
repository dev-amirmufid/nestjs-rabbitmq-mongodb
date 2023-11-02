import { Controller } from '@nestjs/common';
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
    const user = payload.user;
    try {
      const userData = await this.usersService.getUser(user.sub);

      const age = getAge(userData.birthday);

      return {
        zodiac: getZodiac(userData.birthday),
        hosorsope: getHoroscope(userData.birthday),
        age: age,
        ...userData,
      };
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @MessagePattern({ cmd: 'users.createProfile' })
  async createProfile(
    @Ctx() context: RmqContext,
    @Payload() createUserDto: CreateUserDto,
  ) {
    try {
      return await this.usersService.createUser('asdasdasd', createUserDto);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @MessagePattern({ cmd: 'users.updateProfile' })
  async updateProfile(
    @Ctx() context: RmqContext,
    @Payload() updateUserDto: UpdateUserDto,
  ) {
    this.sharedService.acknowledgeMessage(context);
    try {
      return await this.usersService.updateUser('asdasd', updateUserDto);
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
