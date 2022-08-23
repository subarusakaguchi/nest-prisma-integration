import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EmailAlreadyExistsInterceptor } from './interceptors/emailAlreadyExistsInterceptor';
import { PostNotFoundInterceptor } from './interceptors/postNotFoundInterceptor';
import { UserNotFoundInterceptor } from './interceptors/userNotFoundInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new EmailAlreadyExistsInterceptor());

  app.useGlobalInterceptors(new UserNotFoundInterceptor());

  app.useGlobalInterceptors(new PostNotFoundInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
