import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { configure as MobxConfigure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import { RootStoreProvider } from './app/datastores/RootStoreContext';
import reportWebVitals from './reportWebVitals';
import rootStore from './app/datastores/RootStore';

MobxConfigure({ enforceActions: true });

ReactDOM.render(
  <RootStoreProvider rootStore={rootStore}>
    <BrowserRouter>
      <ChakraProvider theme={rootStore.themeStore.internalTheme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </RootStoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
reportWebVitals();
