import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsUUID()
  authorId: string;
}
