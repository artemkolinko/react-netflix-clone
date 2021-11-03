const request = require('supertest');
const app = require('./server');

describe('POST /api/v1/auth/register', () => {
  describe('given a username and password', () => {
    const reqBody = {
      email: 'email@gmail.com',
      password: 'password',
    };

    const path = '/api/v1/auth/register';

    test('should respond with a 200 code status', async () => {
      const response = await request(app).post(path).send(reqBody);
      expect(response.statusCode).toBe(200);
    }, 15000);

    test('should specify json in the content type header', async () => {
      const response = await request(app).post(path).send(reqBody);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });
    test('response has message', async () => {
      const response = await request(app).post(path).send(reqBody);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('when the username and password is missing', () => {
    test('should respond with a status code of 400', async () => {
      const bodyData = [{email: 'email@gmail.com'}, {password: 'password'}, {}];
      for (const body of bodyData) {
        const response = await request(app).post('/users').send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
