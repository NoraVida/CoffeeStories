import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app';

jest.mock('../middlewares/authorization');

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn().mockReturnValue('valami'),
}));

describe('POST /api/createnewproduct', () => {
  beforeAll(async () => {
    dotenv.config();
    await mongoose.connect(process.env.TEST_MONGO_URI);
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('should respond with 200', (done) => {
    const reqBody = {
      name: 'kávé',
      brand: 'kávémárka',
      type: 'szemes',
      ingredient: '100% arabika',
      description: 'Új kávé',
    };

    request(app)
      .post('/api/createnewproduct')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send(reqBody)
      .expect(200)
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        const resData = {
          id: data.body.id,
          name: 'kávé',
          brand: 'kávémárka',
          rating: 0,
          ratingNumber: 0,
          type: 'szemes',
          ingredient: '100% kávé',
          description: 'Új kávé',
        };
        expect(data.body).toEqual(resData);
        return done();
      });
  });
});
