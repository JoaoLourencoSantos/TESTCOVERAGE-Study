import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;

    if (err || !user) {
      if (!username || !password) {
        throw new BadRequestException(
          'The [username] and [password] parameters are required',
        );
      }

      throw err || new UnauthorizedException();
    }

    return user;
  }
}
