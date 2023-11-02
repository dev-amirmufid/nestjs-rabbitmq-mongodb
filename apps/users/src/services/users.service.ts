import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UpdateUserDto, CreateUserDto } from '@users/dtos';
import { UsersEntity } from '@users/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: MongoRepository<UsersEntity>,
  ) {}

  /* Get All */
  async getAllUsers(): Promise<UsersEntity[]> {
    const usersData = await this.usersRepository.find();
    if (!usersData || usersData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return usersData;
  }

  /* Get By Id*/
  async getUser(accountId: string): Promise<UsersEntity> {
    const existingUser = await this.usersRepository.findOneBy({ accountId });
    if (!existingUser) {
      throw new NotFoundException(`User #${accountId} not found`);
    }
    return existingUser;
  }

  /* Create */
  async createUser(
    accountId: string,
    createUserDto: CreateUserDto,
  ): Promise<UsersEntity> {
    const insertData = {
      ...createUserDto,
      accountId,
    };
    const newUser = await this.usersRepository.save(insertData);
    return newUser;
  }

  /* Update */
  async updateUser(
    accountId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersEntity> {
    const updateUser: any = await this.usersRepository.findOneAndUpdate(
      { accountId },
      { $set: updateUserDto },
    );

    return updateUser;
  }

  /* Delete */
  async deleteUser(id: any): Promise<UsersEntity> {
    const deletedUser: any = await this.usersRepository.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return deletedUser;
  }
}
