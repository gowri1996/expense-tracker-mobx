import LiveService from './live/LiveService';
import MockService from './mock/MockService';

const service =
  process.env.REACT_APP_USE_LIVE_SERVICE === 'true' ? LiveService : MockService;

const constructSuccessResponse = (result) => {
  return result;
};

const constructErrorResponse = (error) => {
  return error;
};

const registerUserService = (request) => {
  return service.registerUserService(request);
};

const loginUserService = (request) => {
  return service.loginUserService(request);
};

const resetPasswordUserService = (request) => {
  return service.resetPasswordUserService(request);
};

const getUserFullDetails = () => {
  return service.getUserFullDetails();
};

const refreshTokens = () => {
  return service.refreshTokens();
};

const logoutUser = () => {
  return service.logoutUser();
};

const getExpenseCategories = () => {
  return service.getExpenseCategories();
};

const createExpense = (request) => {
  return service.createExpense(request);
};

const deleteExpense = (request) => {
  return service.deleteExpense(request);
};

const updateExpense = (expenseId, request) => {
  return service.updateExpense(expenseId, request);
};

const exportData = {
  constructErrorResponse,
  constructSuccessResponse,
  registerUserService,
  loginUserService,
  resetPasswordUserService,
  getUserFullDetails,
  refreshTokens,
  logoutUser,

  getExpenseCategories,
  createExpense,
  deleteExpense,
  updateExpense,
};

export default exportData;
