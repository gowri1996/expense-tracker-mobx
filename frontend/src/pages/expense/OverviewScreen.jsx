import { Box, Heading, Text } from '@chakra-ui/react';

import React from 'react';
import { secureComponent } from '../../components/SecureComponent';
import { withContext } from '../../app/datastores/RootStoreContext';

const OverviewScreen = (props) => {
  return (
    <Box p={4}>
      <Box>
        <Heading fontWeight={300} letterSpacing={0.5}>
          Hey {props.rootStore.userStore.name}
        </Heading>
        <Text>This is your Overview page</Text>
      </Box>
    </Box>
  );
};

export default secureComponent(withContext(OverviewScreen));
