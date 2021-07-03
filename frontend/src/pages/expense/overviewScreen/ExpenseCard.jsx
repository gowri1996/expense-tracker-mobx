import { Box, Text } from '@chakra-ui/react';

import React from 'react';
import { observer } from 'mobx-react';

const ExpenseCard = (props) => {
  return (
    <Box>
      <Text>{props.data.name}</Text>
      <Text>{props.data.expense}</Text>
    </Box>
  );
};

export default observer(ExpenseCard);
