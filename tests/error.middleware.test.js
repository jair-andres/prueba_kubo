const request = require('supertest');
const express = require('express');
const errorHandler = require('../middlewares/error.middleware');

describe('Error Middleware en aislamiento', () => {
  let app;

  beforeAll(() => {
    app = express();
    // Ruta “falsa” que siempre lanza un error
    app.get('/fail', (req, res) => {
      throw new Error('Error de prueba');
    });
    // Montamos el middleware de errores justo después
    app.use(errorHandler);
  });

  test('captura excepción y devuelve JSON 500 consistente', async () => {
    const res = await request(app).get('/fail');
    expect(res.statusCode).toBe(500);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual({ message: 'Error interno del servidor' });
  });
});