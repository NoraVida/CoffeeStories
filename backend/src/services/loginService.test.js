import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from '../app';
// import User from '../models/User';
import { errorMessages } from '../error/errorMessages';

describe('when the email or password is missing', () => {
  beforeAll(async () => {
    dotenv.config();
    await mongoose.connect(process.env.TEST_MONGO_URI);
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('should respond with 400 if email and password are missing', (done) => {
    const reqBody = {
      email: '',
      password: '',
    };

    request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual(errorMessages.emptyEmailPassword);
        return done();
      });
  });
});
