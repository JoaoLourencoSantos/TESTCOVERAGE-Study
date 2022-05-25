import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RequiredParametersException } from '../app/exceptions/RequiredParametersException';
import UserService from '../app/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async auth(email: string, virtualPass: string): Promise<any> {
    if (!email || !virtualPass) {
      throw new RequiredParametersException(
        'The login parameters was not to be null',
      );
    }
    return await this.userService.auth(email, virtualPass);
  }

  async login(user: any) {
    if (!user || !user.id || !user.email) {
      throw new RequiredParametersException(
        'The user parameters was not to be null',
      );
    }

    const payload = { userId: user.id, userEmail: user.email };

    return {
      access_token: 'Bearer ' + this.jwtService.sign(payload),
      body: user,
      sucess: true,
      message: 'Authenticated',
    };
  }
}
