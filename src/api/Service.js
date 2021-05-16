import LiveService from './live/LiveService';
import MockService from './mock/MockService';

const service =
  process.env.REACT_APP_USE_LIVE_SERVICE === 'true' ? LiveService : MockService;

const constructSuccessResponse = (result) => {
  return { result };
};

const constructErrorResponse = (error) => {
  return { error };
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

const exportData = {
  registerUserService,
  loginUserService,
  resetPasswordUserService,
  constructErrorResponse,
  constructSuccessResponse,
};

export default exportData;
