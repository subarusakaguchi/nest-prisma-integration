import { Prisma } from '@prisma/client';

export class Post implements Prisma.PostUncheckedCreateInput {
  id?: string;

  title: string;

  content?: string;

  published?: boolean;

  created_at?: string | Date;

  updated_at?: string | Date;

  authorId: string;
}
