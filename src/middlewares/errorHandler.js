export function errorHandler(err, _req, res, _next) {
  console.error('ERROR:', err);
  const status = err.status || 500;
  return res.status(status).json({
    status,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}
