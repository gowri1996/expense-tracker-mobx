import { makeObservable, observable } from "mobx";

import themes from "./themes";

class ThemeStore {
  internalTheme = themes;

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      internalTheme: observable,
    });
  }
}

export default ThemeStore;
