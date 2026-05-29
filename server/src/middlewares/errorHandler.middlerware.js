const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    console.error({
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      time: new Date().toISOString(),
    });
  }

  res.status(statusCode).json({
    status: statusCode >= 500 ? 'failed' : 'error',
    message: message,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;
