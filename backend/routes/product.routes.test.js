const request = require('supertest');
const app = require('../index');



describe('Product Routes', () => {
  let token;
  let productId;

  
  beforeAll(async () => {
    const email = `prod${Date.now()}@mail.com`;
    const password = '123456';
    const res = await request(app)
      .post('/users')
      .send({ email, password });
    token = res.body.token;
  });

  it('should not allow access to products without token', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Token não fornecido');
  });

  it('should create a product', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Produto Teste',
        description: 'Descrição',
        price: 10,
        category: 'Categoria',
        stock: 5
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Produto Teste');
    productId = res.body.id;
  });

  it('should list products', async () => {
    const res = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Produto Atualizado',
        description: 'Nova descrição',
        price: 20,
        category: 'Nova Categoria',
        stock: 10
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Produto Atualizado');
  });

  it('should delete a product', async () => {
    const res = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});

