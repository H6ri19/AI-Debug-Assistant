import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let token = authHeader.split(' ')[1];
  token = token.replace(/^"+|"+$/g, '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach user id
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
