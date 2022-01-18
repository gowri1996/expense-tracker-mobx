import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

import ExpenseStore from './ExpenseStore';
import Service from '../../api/Service';
import { deleteToken } from '../../utils/AuthUtils';
import isEmpty from 'lodash.isempty';

class UserStore {
  _id = null;
  firstName = null;
  lastName = null;
  email = null;
  expenses = [];
  token = null;
  refreshToken = null;

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      _id: observable,
      firstName: observable,
      lastName: observable,
      email: observable,
      expenses: observable,
      token: observable,
      refreshToken: observable,

      name: computed,
      setUser: action,
      registerUser: action,
      loginUser: action,
      resetPasswordUser: action,
      getFullDetails: action,
      refreshTokens: action,
      logoutUser: action,
    });
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  resetUser = () => {
    this._id = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.expenses = [];
    this.token = null;
    this.refreshToken = null;
  };

  setUser = (user) => {
    this._id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.expenses = this.constructExpenses(user.expenses);
    this.token = user.token;
    this.refreshToken = user.refreshToken;
  };

  constructExpenses = (userExpenses) => {
    const expenses = [];
    userExpenses.forEach((expense) => {
      expenses.push(new ExpenseStore(expense));
    });
    return expenses;
  };

  registerUser = async (request) => {
    return Service.registerUserService(request).then(
      (response) => {
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  loginUser = async (request) => {
    return Service.loginUserService(request).then(
      (response) => {
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  resetPasswordUser = async (request) => {
    return Service.resetPasswordUserService(request).then(
      (response) => {
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  getFullDetails = async (token) => {
    return Service.getUserFullDetails(token).then(
      (response) => {
        runInAction(() => {
          this.setUser(response.data);
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  refreshTokens = async (refreshToken) => {
    return Service.refreshTokens(refreshToken).then(
      (response) => {
        runInAction(() => {
          this.setUser(response.data);
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  logoutUser = async () => {
    return Service.logoutUser(this.token).then(
      (response) => {
        runInAction(() => {
          this.resetUser();
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  createExpense = async (expense) => {
    return Service.createExpense({ expense, token: this.token }).then(
      (response) => {
        runInAction(() => {
          this.expenses.push(new ExpenseStore(response.data));
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  deleteExpense = async (expenseId) => {
    return Service.deleteExpense({ expenseId, token: this.token }).then(
      (response) => {
        runInAction(() => {
          this.expenses.splice(
            this.expenses.findIndex((expense) => expense._id === expenseId),
            1
          );
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  updateExpense = async (request) => {
    return Service.updateExpense({ ...request, token: this.token }).then(
      (response) => {
        runInAction(() => {
          const expense = this.expenses.find(
            (expense) => expense._id === response.data._id
          );
          if (expense) expense.updateExpense(response.data);
        });
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };
}

export default UserStore;
