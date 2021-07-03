import Navbar from '../components/Navbar';
import React from 'react';
import { Stack } from '@chakra-ui/react';

const ExpensePageSetup = (props) => {
  return (
    <Stack direction='row' style={{ marginTop: 0 }} width='full'>
      <Navbar />
      {props.render()}
    </Stack>
  );
};

export default ExpensePageSetup;
