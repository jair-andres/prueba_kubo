// app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const db = require('./models');
require('dotenv').config();

const app = express();

// 1) Seguridad: cabeceras con Helmet
app.use(helmet());

// 2) CORS: solo permitir peticiones desde localhost en desarrollo
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // ajusta el puerto de tu frontend
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// 3) Rate Limiter: max. 100 peticiones por IP cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// 4) Parseo de JSON
app.use(express.json());

// 5) Rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const movieRoutes = require('./routes/movie.routes');
const viewRoutes = require('./routes/view.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/views', viewRoutes);

// 6) Middleware global de errores
app.use(require('./middlewares/error.middleware'));

// 7) Sincronizar base de datos y arrancar logs
db.sequelize.sync()
  .then(() => console.log('DB sincronizada'))
  .catch(err => console.error('Error al sincronizar BD:', err));

module.exports = app;
