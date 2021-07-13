import './App.css';

import { Route, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import PageLoader from './components/PageLoader';
import RouteConstants from './constants/RouteConstants';
import { VStack } from '@chakra-ui/react';

const AnalyticsScreen = lazy(() => import('./pages/expense/AnalyticsScreen'));
const ExpensePageSetup = lazy(() => import('./pages/ExpensePageSetup'));
const ForgotPasswordScreen = lazy(() => import('./pages/ForgotPasswordScreen'));
const Header = lazy(() => import('./components/Header'));
const LoginScreen = lazy(() => import('./pages/LoginScreen'));
const NotFoundScreen = lazy(() => import('./pages/NotFoundScreen'));
const OverviewScreen = lazy(() => import('./pages/expense/OverviewScreen'));
const RedirectScreen = lazy(() => import('./pages/RedirectScreen'));
const RegisterScreen = lazy(() => import('./pages/RegisterScreen'));

const App = () => {
  return (
    <VStack as='main' height='100vh'>
      <Suspense fallback={<PageLoader title='Loading ...' />}>
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
            <ExpensePageSetup component={<OverviewScreen />} />
          </Route>
          <Route exact path={RouteConstants.ANALYTICS}>
            <ExpensePageSetup component={<AnalyticsScreen />} />
          </Route>
          <Route exact path='*'>
            <NotFoundScreen />
          </Route>
        </Switch>
      </Suspense>
    </VStack>
  );
};

export default App;
