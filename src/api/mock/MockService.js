import { isArray, isEmpty } from 'lodash';
import {
  isAuthenticatedUser,
  isRefreshTokenValid,
} from '../../utils/AuthUtils';

import StringConstants from '../../constants/StringConstants';
import bcrypt from 'bcryptjs';
import cookies from 'react-cookies';
import jwt from 'jsonwebtoken';

const generateHashPassword = (passwordPlainText) => {
  const hash = bcrypt.hashSync(passwordPlainText, 10);
  return hash;
};

const checkPassword = (passwordPlainText, hashedPassword) => {
  return bcrypt.compareSync(passwordPlainText, hashedPassword);
};

const registerUserService = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!isArray(localUsers)) {
          localUsers = [];
          localStorage.setItem('users', JSON.stringify(localUsers));
        }

        if (localUsers.find((localUser) => localUser.email === request.email)) {
          reject({ message: 'Email address is already registered' });
          return;
        }

        const user = { ...request, token: null, refreshToken: null };
        user.password = generateHashPassword(request.password);

        localUsers.push(user);
        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'User registered successfully',
          data: {},
        });
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const loginUserService = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!isArray(localUsers)) {
          reject({ message: 'Invalid Email / Password' });
          return;
        }
        const user = localUsers.find(
          (localUser) => localUser.email === request.email
        );
        if (isEmpty(user) || !checkPassword(request.password, user.password)) {
          reject({ message: 'Invalid Email / Password' });
          return;
        }

        const token = jwt.sign({ email: request.email }, 'token', {
          expiresIn: '24h',
          issuer: 'daily-user-tracker',
        });
        const refreshToken = jwt.sign(
          { email: request.email },
          'refreshToken',
          {
            expiresIn: '7d',
            issuer: 'daily-user-tracker',
          }
        );

        // store new token and refreshToken
        user.token = token;
        user.refreshToken = refreshToken;

        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'Logged in successfully',
          data: { token, refreshToken },
        });
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const resetPasswordUserService = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!isArray(localUsers)) {
          reject({ message: 'Invalid Email / Password' });
          return;
        }
        const user = localUsers.find(
          (localUser) => localUser.email === request.email
        );
        if (isEmpty(user)) {
          reject({ message: 'Email address is not registered' });
          return;
        }

        // change to new password
        user.password = generateHashPassword(request.password);

        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'Password reset successfully',
          data: {},
        });
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const getUserFullDetails = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!isArray(localUsers)) {
          reject({ message: 'Invalid Email / Password', status: 400 });
          return;
        }

        const token = cookies.load(StringConstants.COOKIE_TOKEN);
        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isAuthenticatedUser()) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const data = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        resolve({
          status: 200,
          message: 'Password reset successfully',
          data,
        });
      } catch (err) {
        reject({ ...err, status: 400 });
      }
    }, 1000);
  });
};

const refreshTokens = (refreshToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!isArray(localUsers)) {
          reject({ message: 'Invalid Email / Password' });
          return;
        }

        console.log(refreshToken);
        const user = localUsers.find(
          (localUser) => localUser.refreshToken === refreshToken
        );
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials' });
          return;
        }

        if (!isRefreshTokenValid()) {
          reject({ message: 'Token Expired' });
          return;
        }

        const token = jwt.sign({ email: user.email }, 'token', {
          expiresIn: '24h',
          issuer: 'daily-user-tracker',
        });

        // store new token and refreshToken
        user.token = token;

        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'Logged in successfully',
          data: { token, refreshToken },
        });
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const exportData = {
  registerUserService,
  loginUserService,
  resetPasswordUserService,
  getUserFullDetails,
  refreshTokens,
};

export default exportData;
