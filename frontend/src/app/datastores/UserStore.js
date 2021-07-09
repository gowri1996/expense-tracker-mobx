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

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      _id: observable,
      firstName: observable,
      lastName: observable,
      email: observable,
      expenses: observable,

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
  };

  setUser = (user) => {
    if (isEmpty(user)) return;

    if (!isEmpty(user._id)) this._id = user._id;
    if (!isEmpty(user.firstName)) this.firstName = user.firstName;
    if (!isEmpty(user.lastName)) this.lastName = user.lastName;
    if (!isEmpty(user.email)) this.email = user.email;
    if (!isEmpty(user.expenses))
      this.expenses = this.constructExpenses(user.expenses);
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

  getFullDetails = async () => {
    return Service.getUserFullDetails().then(
      (response) => {
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  refreshTokens = async () => {
    return Service.refreshTokens().then(
      (response) => {
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  logoutUser = async () => {
    return Service.logoutUser().then(
      (response) => {
        runInAction(() => {
          this.resetUser();
        });
        deleteToken();
        return Service.constructSuccessResponse(response);
      },
      (error) => {
        throw Service.constructErrorResponse(error);
      }
    );
  };

  createExpense = async (request) => {
    return Service.createExpense(request).then(
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

  deleteExpense = async (request) => {
    return Service.deleteExpense(request).then(
      (response) => {
        runInAction(() => {
          const expenseId = request;
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

  updateExpense = async (expenseId, request) => {
    return Service.updateExpense(expenseId, request).then(
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
