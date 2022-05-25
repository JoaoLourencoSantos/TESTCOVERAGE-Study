import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequiredParametersException } from '../../src/app/exceptions/RequiredParametersException';
import { AuthService } from '../../src/auth/auth.service';
import * as ormOptions from '../../src/config/orm';
import { AuthModule } from '../../src/auth/auth.module';

describe('AuthService (e2e)', () => {
  let app: TestingModule;
  let service: AuthService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormOptions), AuthModule],
      providers: [AuthService, JwtService],
    }).compile();

    service = app.get<AuthService>(AuthService);
  });

  describe('login()', () => {
    it('Success Case', async () => {
      const result: any = await service.login({
        id: 1,
        email: 'admin@gmail.com',
      });

      expect(result).toBeDefined();
      expect(result).toMatchObject(defReturn());
    });

    it('Invalid Payload Case', async () => {
      expect(
        service.login({
          email: 'admin@gmail.com',
        }),
      ).rejects.toThrow(RequiredParametersException);

      expect(
        service.login({
          id: 1,
          email: '',
        }),
      ).rejects.toThrow(RequiredParametersException);
    });
  });

  describe('auth()', () => {
    it('Success Case', async () => {
      const result: any = await service.auth('admin@gmail.com', '12345678');

      expect(result).toBeDefined();
      expect(result).toMatchObject(defReturn().body);
    });

    it('Faild Case', async () => {
      const result: any = await service.auth('admin1@gmail.com', '12345678');

      expect(result).toBeNull();
    });

    it('Invalid Payload Case', async () => {
      expect(service.auth('admin1@gmail.com', '')).rejects.toThrow(
        RequiredParametersException,
      );

      expect(service.auth('', '12345678')).rejects.toThrow(
        RequiredParametersException,
      );
    });
  });

  function defReturn(): any {
    return {
      body: {
        id: 1,
        email: 'admin@gmail.com',
      },
      sucess: true,
      message: 'Authenticated',
    };
  }
});
