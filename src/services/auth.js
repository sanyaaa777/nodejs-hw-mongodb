import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Session from '../models/session.js';
import { generateTokens } from '../utils/tokens.js';

export async function register({ name, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) throw createError(409, 'Email in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return { _id: user._id, name: user.name, email: user.email };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw createError(401, 'Invalid credentials');
  }

  await Session.deleteMany({ userId: user._id });
  const tokenData = generateTokens({ id: user._id });

  await Session.create({ userId: user._id, ...tokenData });

  return { accessToken: tokenData.accessToken, refreshToken: tokenData.refreshToken };
}

export async function refresh(refreshToken) {
  const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  const session = await Session.findOne({ userId: payload.id, refreshToken });

  if (!session) throw createError(401, 'Invalid session');
  await Session.deleteOne({ _id: session._id });

  const tokenData = generateTokens({ id: payload.id });
  await Session.create({ userId: payload.id, ...tokenData });

  return { accessToken: tokenData.accessToken, refreshToken: tokenData.refreshToken };
}

export async function logout(refreshToken) {
  await Session.deleteOne({ refreshToken });
}
