import { Box, Stack } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import React from 'react';

const ExpensePageSetup = (props) => {
  return (
    <Stack direction='row' style={{ marginTop: 0 }} width='full' height='full'>
      <Navbar
        width={{
          md: '100px',
          lg: '100px',
          xl: '100px',
          xxl: '250px',
        }}
      />
      <Box
        style={{ margin: '0px' }}
        width={{
          xs: 'full',
          sm: 'full',
          md: 'calc(100% - 100px)',
          lg: 'calc(100% - 100px)',
          xl: 'calc(100% - 100px)',
          xxl: 'calc(100% - 250px)',
        }}
      >
        {props.render()}
      </Box>
    </Stack>
  );
};

export default ExpensePageSetup;
