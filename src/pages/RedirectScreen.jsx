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
    const redirectUser = (redirectUrl) => {
      const user = getUserDataFromCookie();
      if (!isEmpty(user)) {
        props.rootStore.userStore
          .getFullDetails()
          .then((response) => {
            props.rootStore.userStore.setUser(response.data);

            if (redirectUrl) {
              history.replace(redirectUrl);
              return;
            }
            history.replace(RouteConstants.OVERVIEW);
          })
          .catch((error) => {
            console.log(error);
            if (error.status === 401) {
              let refreshToken = cookies.load(
                StringConstants.COOKIE_REFRESH_TOKEN
              );
              props.rootStore.userStore
                .refreshTokens(refreshToken)
                .then((response) => {
                  cookies.save(
                    StringConstants.COOKIE_TOKEN,
                    response.data.token,
                    {
                      path: RouteConstants.LOGIN,
                    }
                  );
                  cookies.save(
                    StringConstants.COOKIE_REFRESH_TOKEN,
                    response.data.refreshToken,
                    {
                      path: RouteConstants.LOGIN,
                    }
                  );
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                  deleteToken();
                  history.replace(RouteConstants.LOGIN);
                });
            } else {
              deleteToken();
              history.replace(RouteConstants.LOGIN);
            }
          });
      } else {
        history.replace(RouteConstants.LOGIN);
      }
    };

    if (location.search) {
      const token = getParamsFromUrl(
        location.search,
        StringConstants.COOKIE_TOKEN
      );
      const refreshToken = getParamsFromUrl(
        location.search,
        StringConstants.COOKIE_REFRESH_TOKEN
      );

      const redirect = getParamsFromUrl(
        location.search,
        RouteConstants.REDIRECT_KEYWORD
      );
      if (!isEmpty(token) && !isEmpty(refreshToken)) {
        cookies.save(StringConstants.COOKIE_TOKEN, token, {
          path: RouteConstants.LOGIN,
        });
        cookies.save(StringConstants.COOKIE_REFRESH_TOKEN, refreshToken, {
          path: RouteConstants.LOGIN,
        });
        redirectUser();
      } else if (!isEmpty(redirect)) {
        const otherParams = getAllParamsAsStringFromUrl(location.search, [
          RouteConstants.REDIRECT_KEYWORD,
        ]);
        redirectUser(redirect + otherParams);
      }
    } else if (isAuthenticatedUser()) {
      redirectUser();
    } else {
      history.replace(RouteConstants.LOGIN);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <PageLoader title='Loading your account ...' />;
};

export default withContext(RedirectScreen);
