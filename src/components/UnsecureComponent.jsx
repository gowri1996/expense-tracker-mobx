import RouteConstants from '../constants/RouteConstants';
import { isAuthenticatedUser } from '../utils/AuthUtils';
import { withContext } from '../app/datastores/RootStoreContext';
import { withRouter } from 'react-router';

export const unsecureComponent = (Page) => {
  return withRouter(
    withContext((props) => {
      if (isAuthenticatedUser()) {
        props.history.replace(RouteConstants.REDIRECT);
        return <></>;
      }
      return <Page {...props} />;
    })
  );
};
