import { Box, Heading } from '@chakra-ui/react';

import React from 'react';
import { secureComponent } from '../../components/SecureComponent';

const AnalyticsScreen = (props) => {
  return (
    <Box p={4} width='full'>
      <Box>
        <Heading fontWeight={300} letterSpacing={0.5}>
          Analytics
        </Heading>
      </Box>
    </Box>
  );
};

export default secureComponent(AnalyticsScreen);
