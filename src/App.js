import './App.css';

import { Route, Switch } from 'react-router-dom';

import DashboardScreen from './pages/DashboardScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import Header from './components/Header';
import LoginScreen from './pages/LoginScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import RedirectScreen from './pages/RedirectScreen';
import RegisterScreen from './pages/RegisterScreen';
import RouteConstants from './constants/RouteConstants';
import { VStack } from '@chakra-ui/react';

const App = () => {
  return (
    <VStack>
      <Header />
      <Switch>
        <Route exact path={RouteConstants.LOGIN}>
          <LoginScreen />
        </Route>
        <Route exact path={RouteConstants.FORGOT_PASSWORD}>
          <ForgotPasswordScreen />
        </Route>
        <Route exact path={RouteConstants.REGISTER}>
          <RegisterScreen />
        </Route>
        <Route exact path={RouteConstants.REDIRECT}>
          <RedirectScreen />
        </Route>
        <Route exact path={RouteConstants.DASHBOARD}>
          <DashboardScreen />
        </Route>
        <Route exact path='*'>
          <NotFoundScreen />
        </Route>
      </Switch>
    </VStack>
  );
};

export default App;
