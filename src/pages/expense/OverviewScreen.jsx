import { Box, Heading } from '@chakra-ui/react';

import React from 'react';
import { secureComponent } from '../../components/SecureComponent';

const OverviewScreen = () => {
  return (
    <Box p={4}>
      <Box>
        <Heading>Overview</Heading>
      </Box>
    </Box>
  );
};

export default secureComponent(OverviewScreen);
