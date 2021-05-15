import ThemeStore from './ThemeStore';
import UserStore from './UserStore';

class RootStore {
  constructor() {
    this.user = new UserStore(this);
    this.theme = new ThemeStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
