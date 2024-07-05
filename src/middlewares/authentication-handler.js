import JWTService from '../services/jwt.service.js';

export default async function authenticationHandler(req, res, next) {
  const unprotectedRoutes = process.env.UNPROTECTED_ROUTES.split(',');
  if (unprotectedRoutes.includes(req.path)) {
    return next();
  }
  const token = req.cookies?.accessToken;
  try {
    const { sessionData: jwtUser } = await JWTService.verifyToken(token);
    req.jwtUser = jwtUser;
    next();
  } catch (err) {
    next(err);
  }
}