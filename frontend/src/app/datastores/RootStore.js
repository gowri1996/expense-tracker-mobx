import ThemeStore from './ThemeStore';
import UserStore from './UserStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.themeStore = new ThemeStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
