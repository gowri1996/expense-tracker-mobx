import { Box, Heading, Text } from '@chakra-ui/react';

import React from 'react';
import { secureComponent } from '../../components/SecureComponent';

const AnalyticsScreen = (props) => {
  return (
    <Box p={4} width='full'>
      <Box>
        <Heading fontWeight={300} letterSpacing={0.5}>
          Hey {props.rootStore.userStore.name} -{' '}
          {props.rootStore.userStore.expenses.length}
        </Heading>
        <Text>This is your Analytics page</Text>
      </Box>
    </Box>
  );
};

export default secureComponent(AnalyticsScreen);
