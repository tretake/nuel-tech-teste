const request = require('supertest');
const app = require('./index');

describe('API Endpoints', () => {
  it('should return 401 for invalid login', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ email: 'fake@email.com', password: 'wrong' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Usuário não encontrado');
  });

});