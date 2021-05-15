const registerUserService = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //resolve(user);
      reject({ message: 'Invalid request' });
    }, 3000);
  });
};

const loginUserService = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user);
      //reject({ message: 'Invalid request' });
    }, 3000);
  });
};

const resetPasswordUserService = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user);
      //reject({ message: 'Invalid request' });
    }, 3000);
  });
};

export { registerUserService, loginUserService, resetPasswordUserService };
