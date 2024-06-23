import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { TestingModule, Test } from '@nestjs/testing';
import passport from 'passport';
describe('Todo API Tests (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should authenticate user with correct credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ userName: 'shahan', password: '123456' })
      .expect(201)
      .expect('Content-Type', /json/);
    console.log(response);
    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate user with incorrect credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ userName: 'shahan', password: 'wrongpass' })
      .expect(404);

    expect(response.body).toHaveProperty('message', 'password is wrong');
  });

  afterAll(async () => {
    await app.close();
  });
});
