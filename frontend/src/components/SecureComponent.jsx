import { Box, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';

import RouteConstants from '../constants/RouteConstants';
import { isAuthenticatedUser } from '../utils/AuthUtils';
import isEmpty from 'lodash.isempty';
import { observer } from 'mobx-react';
import { withContext } from '../app/datastores/RootStoreContext';

const secureComponent = (Page) => {
  const ObserverPage = observer(Page);
  return withContext((props) => {
    const history = useHistory();
    const location = useLocation();
    const isLoggedIn = isAuthenticatedUser();

    if (isEmpty(props.rootStore.userStore._id)) {
      let route = RouteConstants.REDIRECT;
      if (location && location.pathname) {
        let searchParams = location.search
          ? '&' + location.search.slice(1)
          : '';
        route += '?redirect=' + location.pathname + searchParams;
      }
      history.replace(route);
      return <></>;
    }

    if (!isLoggedIn) {
      return (
        <Box>
          <Text>
            You're not logged in to the system. Try to
            <Link color='blue.500' as={RouterLink} to={RouteConstants.LOGIN}>
              {' '}
              Login
            </Link>
          </Text>
        </Box>
      );
    }

    return <ObserverPage {...props} />;
  });
};

export default secureComponent;
