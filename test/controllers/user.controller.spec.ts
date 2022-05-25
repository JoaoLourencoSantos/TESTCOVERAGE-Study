import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import  UserModule from '../../src/app/modules/user.module';
import * as ormOptions from '../../src/config/orm';

describe('EntryController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormOptions), UserModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Success GET Case', async () => {
    const response = await request(app.getHttpServer())
      .get('/user');
    expect(response.status).toBe(HttpStatus.OK);
  });
  
  it('Not Found GET BY ID Case', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/one/admin');
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('Success POST Case', async () => {
    const entryDto: any = { name: generateUser(), email: generateEmail(), dateBirth: new Date(), createdAt: new Date(), password: '12345678'};
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(entryDto);
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('Success PUT Case', async () => {
    const entryDto: any = { id: 2, name: generateUser(), email: generateEmail(), dateBirth: new Date()};
    const response = await request(app.getHttpServer())
      .put('/user')
      .send(entryDto);
    expect(response.status).toBe(HttpStatus.OK);
  });

  it('Success DELETE Case', async () => {
    const response = await request(app.getHttpServer())
      .delete('/user/2');
    expect(response.status).toBe(HttpStatus.OK);
  });

  function generateUser() {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  function generateEmail(){
    var email = generateUser()+'@gmail.com';
    return email;
  }
});
