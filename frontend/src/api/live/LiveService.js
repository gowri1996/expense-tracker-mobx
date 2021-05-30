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

const getUserFullDetails = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const refreshTokens = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const logoutUser = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const exportData = {
  registerUserService,
  loginUserService,
  resetPasswordUserService,
  getUserFullDetails,
  refreshTokens,
  logoutUser,
};

export default exportData;
