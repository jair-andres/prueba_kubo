module.exports = (err, req, res, next) => {
  // 1) Log del stack trace en el servidor
  console.error(err.stack);

  // 2) Respuesta genérica al cliente, sin exponer err.message
  res.status(err.status || 500).json({
    message: 'Error interno del servidor'
  });
};
