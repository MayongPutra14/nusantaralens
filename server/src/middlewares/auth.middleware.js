export const apiKeyValidator = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({
      status: 'failed',
      message: 'API Key is missing. Access denied',
    });
  }

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({
      status: 'failed',
      message: 'Invalid API Key. You are not authorized.',
    });
  }

  next();
};
