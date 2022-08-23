import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { PostNotFound } from 'src/errors/postNotFound';

@Injectable()
export class PostNotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PostNotFound) {
          throw new NotFoundException(error.message);
        }

        throw error;
      }),
    );
  }
}
