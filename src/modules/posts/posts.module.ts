import { Module } from '@nestjs/common';

import { PostsService } from './posts.service';

import { PostsController } from './posts.controller';

import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/shared/databases/prisma/prisma/prisma.service';

@Module({
  controllers: [PostsController],

  providers: [PostsService, UsersService, PrismaService],
})
export class PostsModule {}
