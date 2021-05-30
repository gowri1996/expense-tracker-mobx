import { Box, Heading } from '@chakra-ui/react';

import React from 'react';
import { secureComponent } from '../../components/SecureComponent';

const OverviewScreen = () => {
  return (
    <Box p={4}>
      <Box>
        <Heading fontWeight={300} letterSpacing={0.5}>
          Overview
        </Heading>
      </Box>
    </Box>
  );
};

export default secureComponent(OverviewScreen);
