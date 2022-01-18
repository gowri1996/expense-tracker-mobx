import { useHistory, useLocation } from 'react-router-dom';

import RouteConstants from '../constants/RouteConstants';
import StringConstants from '../constants/StringConstants';
import cookies from 'react-cookies';
import isEmpty from 'lodash.isempty';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { withContext } from '../app/datastores/RootStoreContext';

const unsecureComponent = (Page) => {
  const ObserverPage = observer(Page);

  return withContext((props) => {
    const token = cookies.load(StringConstants.COOKIE_TOKEN);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
      if (!isEmpty(token)) {
        let route = `${RouteConstants.REDIRECT}?${StringConstants.SECURE_KEYWORD}=${StringConstants.UN_SECURE_VALUE}`; // construct unsecure component value
        route += `&${StringConstants.REDIRECT_KEYWORD}=${location.pathname}`; // construct redirect pathname
        route += location.search ? '&' + location.search.slice(1) : ''; // add query params to url. slice to remove '?' character
        history.replace(route);
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isEmpty(token)) return null;
    return <ObserverPage {...props} />;
  });
};

export default unsecureComponent;
