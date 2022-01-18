import React from 'react';
import { observer } from 'mobx-react';

const RootStoreContext = React.createContext();

export const RootStoreProvider = ({ rootStore, children, ...rest }) => {
  return (
    <RootStoreContext.Provider value={rootStore} {...rest}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const withContext = (Component) => {
  const ObserverComponent = observer(Component);
  return (props) => {
    return (
      <RootStoreContext.Consumer>
        {(data) => <ObserverComponent {...props} rootStore={data} />}
      </RootStoreContext.Consumer>
    );
  };
};
