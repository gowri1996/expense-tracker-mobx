import * as LiveService from './live/LiveService';
import * as MockService from './mock/MockService';

const service =
  process.env.REACT_APP_USE_LIVE_SERVICE === 'true' ? LiveService : MockService;

const constructSuccessResponse = (result) => {
  return { result };
};

const constructErrorResponse = (error) => {
  return { error };
};

const registerUserService = (user) => {
  return service.registerUserService(user);
};

const loginUserService = (user) => {
  return service.loginUserService(user);
};

const resetPasswordUserService = (user) => {
  return service.resetPasswordUserService(user);
};

export {
  registerUserService,
  loginUserService,
  resetPasswordUserService,
  constructErrorResponse,
  constructSuccessResponse,
};
