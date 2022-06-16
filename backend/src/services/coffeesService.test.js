import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import 'dotenv/config';

describe('GET /api/coffees', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI);
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('should respond with 200', (done) => {
    request(app)
      .get('/api/coffees')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        expect(data.body).toBeTruthy();
        return done();
      });
  });
});
