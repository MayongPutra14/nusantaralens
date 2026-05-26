const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode === 500) {
    console.error(`Server Error: ${err.stack}`);
  }

  res.status(statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? 'failed' : 'error',
    message: message,
  });
};

export default errorHandler;
