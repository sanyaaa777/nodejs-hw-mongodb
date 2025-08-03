import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';

export default async function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token) {
    return next(createError(401, 'Unauthorized'));
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await User.findById(payload.id);
    if (!user) throw createError(401, 'User not found');
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(createError(401, 'Access token expired'));
    }
    next(createError(401, 'Invalid token'));
  }
}
