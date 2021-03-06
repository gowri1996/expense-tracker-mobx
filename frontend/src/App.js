import './App.css';

import { Route, Switch } from 'react-router-dom';

import AnalyticsScreen from './pages/expense/AnalyticsScreen';
import ExpensePageSetup from './pages/ExpensePageSetup';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import Header from './components/Header';
import LoginScreen from './pages/LoginScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import OverviewScreen from './pages/expense/OverviewScreen';
import RedirectScreen from './pages/RedirectScreen';
import RegisterScreen from './pages/RegisterScreen';
import RouteConstants from './constants/RouteConstants';
import { VStack } from '@chakra-ui/react';

const App = () => {
  return (
    <VStack as='main' height='100vh'>
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
        <Route exact path={RouteConstants.OVERVIEW}>
          <ExpensePageSetup
            key='overview'
            title='Overview | Expense Tracker'
            component={<OverviewScreen />}
          />
        </Route>
        <Route exact path={RouteConstants.ANALYTICS}>
          <ExpensePageSetup
            key='analytics'
            title='Analytics | Expense Tracker'
            component={<AnalyticsScreen />}
          />
        </Route>
        <Route exact path='*'>
          <NotFoundScreen />
        </Route>
      </Switch>
    </VStack>
  );
};

export default App;
