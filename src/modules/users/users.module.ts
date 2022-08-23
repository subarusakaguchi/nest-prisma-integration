import { Module } from '@nestjs/common';

import { UsersService } from './users.service';

import { UsersController } from './users.controller';
import { PrismaService } from 'src/shared/databases/prisma/prisma/prisma.service';

@Module({
  controllers: [UsersController],

  providers: [UsersService, PrismaService],
})
export class UsersModule {}
