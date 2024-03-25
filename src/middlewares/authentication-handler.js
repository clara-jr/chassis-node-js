import JWTService from '../services/jwt.service.js';

export default async function authenticationHandler(req, res, next) {
  const token = req.header('X-Auth-Token');
  try {
    const jwtUser = await JWTService.verifyToken(token);
    req.jwtUser = jwtUser;
    next();
  } catch (err) {
    next(err);
  }
}