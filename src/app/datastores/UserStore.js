import { action, makeObservable, observable, runInAction } from 'mobx';

import Service from '../../api/Service';
import { isEmpty } from 'lodash';

class UserStore {
  firstName = null;
  lastName = null;
  email = null;

  isUserActionLoading = false;

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      email: observable,

      isUserActionLoading: observable,

      setUser: action,
      registerUser: action,
      loginUser: action,
      resetPasswordUser: action,
      getFullDetails: action,
      refreshTokens: action,
    });
  }

  setUser = (user) => {
    if (isEmpty(user)) return;

    if (!isEmpty(user.firstName)) this.firstName = user.firstName;
    if (!isEmpty(user.lastName)) this.lastName = user.lastName;
    if (!isEmpty(user.email)) this.email = user.email;
  };

  registerUser = async (request) => {
    this.isUserActionLoading = true;
    return Service.registerUserService(request).then(
      (response) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        throw Service.constructErrorResponse(error);
      }
    );
  };

  loginUser = async (request) => {
    this.isUserActionLoading = true;
    return Service.loginUserService(request).then(
      (response) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        throw Service.constructErrorResponse(error);
      }
    );
  };

  resetPasswordUser = async (request) => {
    this.isUserActionLoading = true;
    return Service.resetPasswordUserService(request).then(
      (response) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        throw Service.constructErrorResponse(error);
      }
    );
  };

  getFullDetails = async () => {
    this.isUserActionLoading = true;
    return Service.getUserFullDetails().then(
      (response) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        throw Service.constructErrorResponse(error);
      }
    );
  };

  refreshTokens = async () => {
    this.isUserActionLoading = true;
    return Service.refreshTokens().then(
      (response) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        throw Service.constructErrorResponse(error);
      }
    );
  };
}

export default UserStore;
