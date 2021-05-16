import { Box, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import RouteConstants from '../constants/RouteConstants';
import { isAuthenticatedUser } from '../utils/AuthUtils';
import { isEmpty } from 'lodash';
import { withContext } from '../app/datastores/RootStoreContext';

export const secureComponent = (Page) => {
  return withContext(
    withRouter((props) => {
      const isLoggedIn = isAuthenticatedUser();

      if (isEmpty(props.rootStore.userStore.email)) {
        let route = RouteConstants.REDIRECT;
        if (props.location && props.location.pathname) {
          let searchParams = props.location.search
            ? '&' + props.location.search.slice(1)
            : '';
          route += '?redirect=' + props.location.pathname + searchParams;
        }
        props.history.replace(route);
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

      return <Page {...props} />;
    })
  );
};
