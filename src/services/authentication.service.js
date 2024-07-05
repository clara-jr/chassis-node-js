import bcrypt from 'bcrypt';
import JWTService from './jwt.service.js';
import { ApiError } from '../middlewares/custom-error-handler.js';

async function _getUser() {
  // Mocked user (use a database collection instead)
  const user = {
    userName: process.env.USERNAME,
    password: await bcrypt.hash(process.env.PASSWORD, parseInt(process.env.SALT_ROUNDS)),
  };
  return user;
}

/**
 * Login.
 * @param {string} userName Username to login.
 * @param {string} password Password to login.
 * @returns {Promise<object>} A promise that resolves to a pair of tokens.
 */
async function login(userName, password) {
  const user = await _getUser();
  const isValid = user.userName === userName && await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError(401, 'UNAUTHORIZED', 'Invalid username or password.');
  }

  return JWTService.createToken({ userName });
}

/**
 * Extend access token.
 * @param {string} refreshToken Refresh token to extend access token.
 * @returns {Promise<object>} A promise that resolves to a pair of tokens.
 */
async function refreshSession(refreshToken) {
  return JWTService.extendToken(refreshToken);
}

/**
 * Logout.
 * @param {string} token Token to be destroyed.
 * @returns {Promise<void>}
 */
async function logout(accessToken) {
  await JWTService.clearSessionData(accessToken);
}

export default {
  login,
  logout,
  refreshSession
};
