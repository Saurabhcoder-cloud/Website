import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      error: 'server_error',
      message: 'Authentication secret not configured.'
    });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'Authorization header missing or malformed.'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'Invalid or expired token.'
    });
  }
}
