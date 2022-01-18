import { action, makeObservable, observable } from 'mobx';

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
    this._id = data._id;
    this.name = data.name;
    this.expense = data.expense;
    this.category = data.category;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  };
}

export default ExpenseStore;
