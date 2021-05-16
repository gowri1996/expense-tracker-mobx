const registerUserService = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const loginUserService = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const resetPasswordUserService = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const exportData = {
  registerUserService,
  loginUserService,
  resetPasswordUserService,
};

export default exportData;
