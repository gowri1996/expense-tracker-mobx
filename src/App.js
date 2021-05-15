import './App.css';

import { Redirect, Route, Switch } from 'react-router-dom';

import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import Header from './components/Header';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import RouteConstants from './constants/RouteConstants';
import { VStack } from '@chakra-ui/react';

const App = (props) => {
  return (
    <VStack p={4}>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Redirect to={RouteConstants.LOGIN} />
        </Route>
        <Route exact path={RouteConstants.LOGIN}>
          <LoginScreen />
        </Route>
        <Route exact path={RouteConstants.FORGOT_PASSWORD}>
          <ForgotPasswordScreen />
        </Route>
        <Route exact path={RouteConstants.REGISTER}>
          <RegisterScreen />
        </Route>
        <Route exact path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </VStack>
  );
};

export default App;
