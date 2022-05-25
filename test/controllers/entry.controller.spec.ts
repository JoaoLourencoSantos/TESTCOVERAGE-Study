import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { EntryModule } from '../../src/app/modules/entry.module';
import * as ormOptions from '../../src/config/orm';

describe('EntryController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormOptions), EntryModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Success GET Case', async () => {
    const response = await request(app.getHttpServer()).get('/entry');
    expect(response.status).toBe(HttpStatus.OK);
  });

  it('Not Found GET BY ID Case', async () => {
    const response = await request(app.getHttpServer()).get(
      '/entry/one/payment',
    );
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('Success GET INDICATORS Case', async () => {
    const response = await request(app.getHttpServer()).get(
      '/entry/indicators',
    );
    expect(response.status).toBe(HttpStatus.OK);
  });

  it('Success POST Case', async () => {
    const entryDto: any = {
      name: 'payment',
      type: 'bill',
      referenceAt: new Date(),
      value: '50',
      category: 'expense',
    };
    const response = await request(app.getHttpServer())
      .post('/entry')
      .send(entryDto);
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('Success PUT Case', async () => {
    const entryDto: any = {
      name: 'payment2',
      type: 'bill',
      referenceAt: new Date(),
      value: '50',
      category: 'expense',
    };
    const response = await request(app.getHttpServer())
      .put('/entry')
      .send(entryDto);
    expect(response.status).toBe(HttpStatus.OK);
  });

  it('Success DELETE Case', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/entry/payment',
    );
    expect(response.status).toBe(HttpStatus.OK);
  });
});
