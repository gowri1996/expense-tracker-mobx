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

const getExpenseCategories = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const createExpense = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const updateExpense = (expenseId, request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const exportData = {
  registerUserService,
  loginUserService,
  resetPasswordUserService,
  getUserFullDetails,
  refreshTokens,
  logoutUser,

  getExpenseCategories,
  createExpense,
  updateExpense,
};

export default exportData;
