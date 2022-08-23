import { Injectable } from '@nestjs/common';
import { PostNotFound } from 'src/errors/postNotFound';
import { UserNotFound } from 'src/errors/userNotFound';
import { PrismaService } from 'src/shared/databases/prisma/prisma/prisma.service';
import { UsersService } from '../users/users.service';

import { CreatePostDto } from './dto/create-post.dto';

import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create({
    title,
    content,
    published,
    authorId,
  }: CreatePostDto): Promise<Post> {
    const userExists = await this.usersService.findOne(authorId);

    if (!userExists) {
      throw new UserNotFound('User not found');
    }

    const newPost = await this.prisma.post.create({
      data: {
        title,
        content,
        published,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    return newPost;
  }

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) {
      throw new PostNotFound('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const postExists = await this.findOne(id);

    if (!postExists) {
      throw new PostNotFound('Post not found');
    }

    const updatedPost = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
      },
    });

    return updatedPost;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
