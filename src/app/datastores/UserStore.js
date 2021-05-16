import { action, makeObservable, observable, runInAction } from 'mobx';

import Service from '../../api/Service';

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
    });
  }

  setUser = (user) => {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
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
}

export default UserStore;
