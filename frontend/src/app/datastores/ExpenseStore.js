import { action, makeObservable, observable } from 'mobx';

import { isEmpty } from 'lodash';

class ExpenseStore {
  _id = null;
  name = null;
  expense = null;
  category = null;
  description = null;
  createdAt = null;
  updatedAt = null;

  constructor(data) {
    makeObservable(this, {
      _id: observable,
      name: observable,
      expense: observable,
      category: observable,
      description: observable,
      createdAt: observable,
      updatedAt: observable,

      updateExpense: action,
    });

    this._id = data._id;
    this.name = data.name;
    this.expense = data.expense;
    this.category = data.category;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  updateExpense = (data) => {
    if (!isEmpty(data._id)) this._id = data._id;
    if (!isEmpty(data.name)) this.name = data.name;
    if (data.expense !== undefined) this.expense = data.expense;
    if (!isEmpty(data.category)) this.category = data.category;
    if (!isEmpty(data.description)) this.description = data.description;
    if (!isEmpty(data.createdAt)) this.createdAt = data.createdAt;
    if (!isEmpty(data.updatedAt)) this.updatedAt = data.updatedAt;
  };
}

export default ExpenseStore;
