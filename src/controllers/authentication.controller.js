import AuthenticationService from '../services/authentication.service.js';

function _setCookie(res, { accessToken, refreshToken }) {
  const cookieOptions = {
    httpOnly: true, // avoid reading cookie with JavaScript in client side
    secure: !['dev', 'test'].includes(process.env.NODE_ENV), // send cookie via HTTPS
    sameSite: 'strict', // cookie is only available within the same domain
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 1000 * parseInt(process.env.ACCESSTOKEN_TTL) // 1h (in milliseconds)
  }); 
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * parseInt(process.env.REFRESHTOKEN_TTL), // 1d (in milliseconds)
    path: '/auth/refresh', // avoid sending refreshToken in all requests but 'auth/refresh'
  });
}

async function login(req, res) {
  const tokens = await AuthenticationService.login(req.body.userName, req.body.password);
  _setCookie(res, tokens);
  res.sendStatus(200);
}

async function refreshSession(req, res) {
  const tokens = await AuthenticationService.refreshSession(req.cookies?.refreshToken);
  _setCookie(res, tokens);
  res.sendStatus(200);
}

async function logout(req, res) {
  await AuthenticationService.logout(req.cookies?.accessToken);

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.sendStatus(200);
}

export default {
  login,
  logout,
  refreshSession
};
