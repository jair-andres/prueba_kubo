const request = require('supertest');
const app = require('../../app'); // Asegúrate que exportes app en app.js
const db = require('../../models');

describe('Auth Endpoints', () => {
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'Password123!'
  };

  beforeAll(async () => {
    // Limpiar usuario si ya existe
    await db.User.destroy({ where: { username: testUser.username } });
  });

  afterAll(async () => {
    // Eliminar usuario de prueba
    await db.User.destroy({ where: { username: testUser.username } });
    await db.sequelize.close(); // Cerrar conexión a BD
  });

  test('Registro exitoso', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.username).toBe(testUser.username);
  });

  test('Login exitoso', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: testUser.username,
        password: testUser.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.username).toBe(testUser.username);
  });

  test('Login falla con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: testUser.username,
        password: 'ContraseñaIncorrecta1!'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Contraseña incorrecta');
  });
});
