import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { EmailAlreadyExists } from 'src/errors/emailAlreadyExists';

@Injectable()
export class EmailAlreadyExistsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EmailAlreadyExists) {
          throw new ConflictException(error.message);
        }

        throw error;
      }),
    );
  }
}
