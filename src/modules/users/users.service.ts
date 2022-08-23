import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { createHash } from 'crypto';
import { EmailAlreadyExists } from 'src/errors/emailAlreadyExists';
import { UserNotFound } from 'src/errors/userNotFound';
import { PrismaService } from 'src/shared/databases/prisma/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.findByEmail(createUserDto.email);

    if (userAlreadyExists) {
      throw new EmailAlreadyExists('Email already exists');
    }

    createUserDto.password = createHash('md5')
      .update(createUserDto.password)
      .digest('hex');

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });

    if (!user) {
      throw new UserNotFound('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new UserNotFound('User not found');
    }

    updateUserDto.password = createHash('md5')
      .update(updateUserDto.password)
      .digest('hex');

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
