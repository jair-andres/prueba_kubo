// tests/users/user.test.js

const request = require('supertest');
const app = require('../../app');
const db = require('../../models');

describe('User Endpoints', () => {
  const admin = {
    username: 'adminTest',
    email: 'admin@example.com',
    password: 'Password123!'
  };
  const newUser = {
    username: 'userTest',
    email: 'user@example.com',
    password: 'Password123!'
  };
  let token;
  let createdUserId;

  beforeAll(async () => {
    // Limpia usuarios de prueba
    await db.User.destroy({ where: { username: [admin.username, newUser.username] } });

    // Registra y loguea al admin, para obtener token
    await request(app).post('/api/auth/register').send(admin);
    const resLogin = await request(app)
      .post('/api/auth/login')
      .send({ username: admin.username, password: admin.password });
    token = resLogin.body.token;
  });

  afterAll(async () => {
    // Borra usuarios de prueba y cierra conexión
    await db.User.destroy({ where: { username: [admin.username, newUser.username] } });
    await db.sequelize.close();
  });

  it('POST /api/users → debe crear un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);

    expect(res.statusCode).toBe(201);
    // Ahora la respuesta es el propio usuario, no { user: ... }
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toBe(newUser.username);

    createdUserId = res.body.id;
  });

  it('GET /api/users → debe listar todos los usuarios', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(u => u.username === newUser.username)).toBe(true);
  });

  it('GET /api/users/:id → debe devolver un usuario por ID', async () => {
    const res = await request(app)
      .get(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdUserId);
    expect(res.body.username).toBe(newUser.username);
  });

  it('PUT /api/users/:id → debe actualizar un usuario', async () => {
    const updatedData = { username: 'userUpdated' };
    const res = await request(app)
      .put(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/actualizado/i);

    // Verificar en la base que el cambio sucedió
    const updatedUser = await db.User.findByPk(createdUserId);
    expect(updatedUser.username).toBe(updatedData.username);
  });

  it('DELETE /api/users/:id → debe eliminar un usuario', async () => {
    const res = await request(app)
      .delete(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminad/i);

    const deleted = await db.User.findByPk(createdUserId);
    expect(deleted).toBeNull();
  });
});
