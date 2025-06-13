const request = require('supertest');
const app = require('../index');

describe('User Routes', () => {
  let testEmail = `test${Date.now()}@mail.com`;
  let testPassword = '123456';
  let token;

  it('should not allow registration with invalid email', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'invalid', password: testPassword });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Erro de validação');
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(testEmail);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should not allow duplicate registration', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Email já cadastrado');
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ email: testEmail, password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Senha incorreta');
  });
});