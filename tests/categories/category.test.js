const request = require('supertest');
const app = require('../../app');
const db = require('../../models'); // ✅ importa la instancia de Sequelize

describe('Category Endpoints', () => {
  let categoryId;

  afterAll(async () => {
    await db.sequelize.close(); // ✅ cierra la conexión de Sequelize al terminar
  });

  test('POST /api/categories → debe crear una nueva categoría', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send({
        name: 'Action',
        description: 'Películas de acción'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Action');
    categoryId = res.body.id;
  });

  test('GET /api/categories → debe listar todas las categorías', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/categories/:id → debe obtener una categoría por ID', async () => {
    const res = await request(app).get(`/api/categories/${categoryId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', categoryId);
  });

  test('PUT /api/categories/:id → debe actualizar una categoría', async () => {
    const res = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send({ name: 'Adventure' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Adventure');
  });

  test('DELETE /api/categories/:id → debe eliminar una categoría', async () => {
    const res = await request(app).delete(`/api/categories/${categoryId}`);
    expect(res.statusCode).toBe(204);
  });
});
