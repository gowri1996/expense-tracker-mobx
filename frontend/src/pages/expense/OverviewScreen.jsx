import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import CreateExpenseModal from './overviewScreen/CreateExpenseModal';
import ExpenseCard from './overviewScreen/ExpenseCard';
import { FaPlus } from 'react-icons/fa';
import { secureComponent } from '../../components/SecureComponent';

const OverviewScreen = (props) => {
  const [isCreateExpenseModalVisible, setVisible] = useState(false);

  return (
    <>
      <Box p={4} width='full'>
        <Flex>
          <Box>
            <Heading fontWeight={300} letterSpacing={0.5}>
              Overview
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Tooltip label='Create Expense' placement='left' fontSize='sm'>
              <IconButton
                aria-label='createExpenseIcon'
                icon={<FaPlus />}
                size='md'
                onClick={() => {
                  setVisible(true);
                }}
              />
            </Tooltip>
          </Box>
        </Flex>
        <Wrap>
          {props.rootStore.userStore.expenses.map((expense) => (
            <WrapItem key={expense._id}>
              <ExpenseCard data={expense} />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
      <CreateExpenseModal
        visible={isCreateExpenseModalVisible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export default secureComponent(OverviewScreen);
