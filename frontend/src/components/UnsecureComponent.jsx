import RouteConstants from '../constants/RouteConstants';
import { isAuthenticatedUser } from '../utils/AuthUtils';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { withContext } from '../app/datastores/RootStoreContext';

export const unsecureComponent = (Page) => {
  const ObserverPage = observer(Page);
  return withContext((props) => {
    const history = useHistory();
    if (isAuthenticatedUser()) {
      history.replace(RouteConstants.REDIRECT);
      return <></>;
    }
    return <ObserverPage {...props} />;
  });
};
