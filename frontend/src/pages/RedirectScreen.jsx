import {
  deleteToken,
  getUserDataFromCookie,
  isAuthenticatedUser,
} from '../utils/AuthUtils';
import {
  getAllParamsAsStringFromUrl,
  getParamsFromUrl,
} from '../utils/UrlUtils';
import { useHistory, useLocation } from 'react-router-dom';

import PageLoader from '../components/PageLoader';
import RouteConstants from '../constants/RouteConstants';
import StringConstants from '../constants/StringConstants';
import cookies from 'react-cookies';
import isEmpty from 'lodash.isempty';
import { useEffect } from 'react';
import { withContext } from '../app/datastores/RootStoreContext';

const RedirectScreen = (props) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function redirectUser(successRedirectionUrl, failureRedirectionUrl) {
      const savedToken = cookies.load(StringConstants.COOKIE_TOKEN);
      const savedRefreshToken = cookies.load(
        StringConstants.COOKIE_REFRESH_TOKEN
      );
      try {
        await props.rootStore.userStore.getFullDetails(savedToken);
        history.replace(successRedirectionUrl);
      } catch (error) {
        console.log(error);
        if (error.status === 401) {
          try {
            const response =
              props.rootStore.userStore.refreshTokens(savedRefreshToken);
            cookies.save(StringConstants.COOKIE_TOKEN, response.data.token, {
              path: RouteConstants.LOGIN,
            });
            cookies.save(
              StringConstants.COOKIE_REFRESH_TOKEN,
              response.data.refreshToken,
              {
                path: RouteConstants.LOGIN,
              }
            );
            history.replace(successRedirectionUrl);
          } catch (error) {
            console.log(error);
            deleteToken();
            history.replace(failureRedirectionUrl);
          }
        } else {
          deleteToken();
          history.replace(failureRedirectionUrl);
        }
      }
    }

    const securityParam = getParamsFromUrl(
      location.search,
      StringConstants.SECURE_KEYWORD
    );
    const redirect = getParamsFromUrl(
      location.search,
      StringConstants.REDIRECT_KEYWORD
    );
    const otherParams = getAllParamsAsStringFromUrl(location.search, [
      StringConstants.REDIRECT_KEYWORD,
      StringConstants.SECURE_KEYWORD,
    ]);
    const redirectUrl = redirect ? redirect + otherParams : '';

    if (securityParam === StringConstants.UN_SECURE_VALUE) {
      // Unsecure Component
      if (isAuthenticatedUser()) {
        redirectUser(
          RouteConstants.OVERVIEW,
          redirectUrl ? redirectUrl : RouteConstants.LOGIN
        );
      } else {
        if (!isEmpty(getUserDataFromCookie())) {
          redirectUser(
            RouteConstants.OVERVIEW,
            redirectUrl ? redirectUrl : RouteConstants.LOGIN
          );
        } else {
          deleteToken();
          history.replace(redirectUrl ? redirectUrl : RouteConstants.LOGIN);
        }
      }
    } else if (securityParam === StringConstants.SECURE_VALUE) {
      // Secure Component
      redirectUser(
        redirectUrl ? redirectUrl : RouteConstants.OVERVIEW,
        RouteConstants.LOGIN
      );
    } else {
      // After login step
      const token = getParamsFromUrl(
        location.search,
        StringConstants.COOKIE_TOKEN
      );
      const refreshToken = getParamsFromUrl(
        location.search,
        StringConstants.COOKIE_REFRESH_TOKEN
      );
      if (!isEmpty(token) && !isEmpty(refreshToken)) {
        cookies.save(StringConstants.COOKIE_TOKEN, token, {
          path: RouteConstants.LOGIN,
        });
        cookies.save(StringConstants.COOKIE_REFRESH_TOKEN, refreshToken, {
          path: RouteConstants.LOGIN,
        });

        redirectUser(RouteConstants.OVERVIEW, RouteConstants.LOGIN);
      } else {
        history.replace(RouteConstants.LOGIN);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <PageLoader title='Redirecting ...' />;
};

export default withContext(RedirectScreen);
