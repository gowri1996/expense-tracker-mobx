import * as Service from '../../api/Service';

import { action, makeObservable, observable, runInAction } from 'mobx';

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
    });
  }

  setUser = (user) => {
    if (isEmpty(user)) return;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  };

  registerUser = async (user) => {
    this.isUserActionLoading = true;
    return Service.registerUserService(user).then(
      (userResponse) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        return Service.constructSuccessResponse(userResponse);
      },
      (error) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        throw Service.constructErrorResponse(error);
      }
    );
  };

  loginUser = async (user) => {
    this.isUserActionLoading = true;
    return Service.loginUserService(user).then(
      (userResponse) => {
        runInAction((response) => {
          this.isUserActionLoading = false;
        });
        return Service.constructSuccessResponse(userResponse);
      },
      (error) => {
        runInAction(() => {
          this.isUserActionLoading = false;
        });
        throw Service.constructErrorResponse(error);
      }
    );
  };

  resetPasswordUser = async (user) => {
    this.isUserActionLoading = true;
    return Service.resetPasswordUserService(user).then(
      (userResponse) => {
        runInAction((response) => {
          this.isUserActionLoading = false;
        });
        return Service.constructSuccessResponse(userResponse);
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
