import { makeObservable, observable } from 'mobx';

import { extendTheme } from '@chakra-ui/react';

class ThemeStore {
  internalTheme = extendTheme({
    config: { useSystemColorMode: true },
  });

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      internalTheme: observable,
    });
  }
}

export default ThemeStore;
