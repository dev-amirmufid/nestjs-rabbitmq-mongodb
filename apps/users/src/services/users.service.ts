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
  async getUser(authId: string): Promise<UsersEntity> {
    const existingUser = await this.usersRepository.findOneBy({ authId });
    if (!existingUser) {
      throw new NotFoundException(`User #${authId} not found`);
    }
    return existingUser;
  }

  /* Create */
  async createUser(
    authId: string,
    createUserDto: CreateUserDto,
  ): Promise<UsersEntity> {
    const insertData = {
      ...createUserDto,
      authId,
    };
    const newUser = await this.usersRepository.save(insertData);
    return newUser;
  }

  /* Update */
  async updateUser(
    authId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersEntity> {
    const updateUser: any = await this.usersRepository.findOneAndUpdate(
      { authId },
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
