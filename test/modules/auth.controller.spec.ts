import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { AuthModule } from '../../src/auth/auth.module';
import * as ormOptions from '../../src/config/orm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormOptions), AuthModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Fail Case', async () => {
    const user: any = { username: 'admin1@gmail.com', password: '12345678' };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user);
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('Success Case', async () => {
    const user: any = { username: 'admin@gmail.com', password: '12345678' };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user);
    expect(response.status).toBe(HttpStatus.OK);
  });

  it('BadRequest Case', async () => {
    const user: any = { username: 'admin@gmail.com', password: '' };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(user);
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
});
