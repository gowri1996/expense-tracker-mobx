import { isArray, isEmpty } from 'lodash';

import bcrypt from 'bcryptjs';
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
        const refreshToken = jwt.sign(user, 'refresh_token', {
          expiresIn: '4d',
          issuer: 'daily-user-tracker',
        });

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

const exportData = {
  registerUserService,
  loginUserService,
  resetPasswordUserService,
};

export default exportData;
