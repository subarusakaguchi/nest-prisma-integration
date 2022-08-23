import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string;

  name: string;

  email: string;

  password: string;

  isPublisher?: boolean;

  created_at?: string | Date;

  posts?: Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput;
}
