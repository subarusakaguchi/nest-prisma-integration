import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { UserNotFound } from 'src/errors/userNotFound';

@Injectable()
export class UserNotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UserNotFound) {
          throw new NotFoundException(error.message);
        }

        throw error;
      }),
    );
  }
}
