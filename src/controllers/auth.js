import * as authService from '../services/auth.js';

export async function register(req, res) {
  const user = await authService.register(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Successfully registered a user!',
    data: user
  });
}

export async function login(req, res) {
  const { accessToken, refreshToken } = await authService.login(req.body);
  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.status(200).json({
    status: 'success',
    message: 'Successfully logged in an user!',
    data: { accessToken }
  });
}

export async function refresh(req, res) {
  const { refreshToken } = req.cookies;
  const { accessToken, refreshToken: newRefreshToken } = await authService.refresh(refreshToken);
  res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
  res.status(200).json({
    status: 'success',
    message: 'Successfully refreshed a session!',
    data: { accessToken }
  });
}

export async function logout(req, res) {
  const { refreshToken } = req.cookies;
  await authService.logout(refreshToken);
  res.status(204).end();
}
