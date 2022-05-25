import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import  GoalModule from '../../src/app/modules/goal.module';
import * as ormOptions from '../../src/config/orm';
import { GoalDTO } from '../../src/app/dto/goal.dto';

describe('GoalController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormOptions), GoalModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Success GET Case', async () => {
    const response = await request(app.getHttpServer())
      .get('/goal');
    expect(response.status).toBe(HttpStatus.OK);
  });

  it('Not Found GET BY ID Case', async () => {
    const response = await request(app.getHttpServer())
      .get('/goal/one/se');
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('Success POST Case', async () => {
    const goalDto: any = { description: 'house', finishDate: new Date(), value: '50' };
    const response = await request(app.getHttpServer())
      .post('/goal')
      .send(goalDto);
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('Success PUT Case', async () => {
    const goalDto: any = { description: 'house', finishDate: new Date(), value: '50' };
    const response = await request(app.getHttpServer())
      .put('/goal')
      .send(goalDto);
    expect(response.status).toBe(HttpStatus.OK);
  });

  it('Success DELETE Case', async () => {
    const response = await request(app.getHttpServer())
      .delete('/house');
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

});
