const request = require('supertest');
const app = require('../../app');
const db = require('../../models');

describe('Movie Endpoints', () => {
  let movieId;
  let categoryId;

  beforeAll(async () => {
    const category = await db.Category.create({
      name: 'Ciencia Ficción',
      description: 'Películas futuristas'
    });
    categoryId = category.id;
  });

  afterAll(async () => {
    await db.Movie.destroy({ where: {}, truncate: { cascade: true } });
    await db.Category.destroy({ where: {}, truncate: { cascade: true } });
    await db.sequelize.close();
  });

  test('POST /api/movies → debe crear una película', async () => {
    const res = await request(app)
      .post('/api/movies')
      .send({
        name: 'Matrix',
        description: 'Realidad simulada',
        date: new Date().toISOString().split('T')[0], // fecha de hoy
        category_id: categoryId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    movieId = res.body.id;
  });

  test('GET /api/movies → debe listar todas las películas con filtros y orden', async () => {
    const res = await request(app)
        .get('/api/movies')
        .query({ title: 'Avengers', category_id: 1, sort: 'desc', page: 1, limit: 5 });

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.results)).toBe(true); // ← aquí el cambio
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('pages');
  });


  test('GET /api/movies/:id → debe obtener una película por ID', async () => {
    const res = await request(app).get(`/api/movies/${movieId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', movieId);
  });

  test('GET /api/movies/new_releases → debe obtener películas recientes', async () => {
    const res = await request(app).get('/api/movies/new_releases');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/movies/:id → debe actualizar una película', async () => {
    const res = await request(app)
      .put(`/api/movies/${movieId}`)
      .send({ name: 'Matrix Reloaded' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Matrix Reloaded');
  });

  test('DELETE /api/movies/:id → debe eliminar una película', async () => {
    const res = await request(app).delete(`/api/movies/${movieId}`);
    expect(res.statusCode).toBe(204);
  });
});
