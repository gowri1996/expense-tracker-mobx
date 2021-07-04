import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Tooltip,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AppUtils from '../../utils/AppUtils';
import CreateExpenseModal from './overviewScreen/CreateExpenseModal';
import ExpenseCard from './overviewScreen/ExpenseCard';
import { FaPlus } from 'react-icons/fa';
import Service from '../../api/Service';
import { secureComponent } from '../../components/SecureComponent';

const OverviewScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [isCreateExpenseModalVisible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    Service.getExpenseCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'Could not load categories',
            description: error.message,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createExpense = (expenseValues) => {
    setLoading(true);
    props.rootStore.userStore
      .createExpense({
        name: expenseValues.name,
        expense: expenseValues.expense,
        category: expenseValues.category,
        description: expenseValues.description,
      })
      .then(() => {
        toast(
          AppUtils.successToastMessage({
            title: 'Expense created',
          })
        );
      })
      .catch((error) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'Expense cannot be added',
            description: error.message,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box p={4}>
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
      <Wrap mt={5} mb={2} spacing='4'>
        {props.rootStore.userStore.expenses.map((expense) => (
          <WrapItem
            key={expense._id}
            width={{
              xs: 'full',
              sm: 'calc(calc((100% / 2)) - 20px)',
              xl: 'calc(calc((100% / 3)) - 20px)',
              xxl: 'calc(calc((100% / 3)) - 20px)',
            }}
          >
            <ExpenseCard data={expense} width='full' />
          </WrapItem>
        ))}
      </Wrap>
      <CreateExpenseModal
        visible={isCreateExpenseModalVisible}
        loading={loading}
        categories={categories}
        createExpense={createExpense}
        onClose={() => {
          setVisible(false);
        }}
      />
    </Box>
  );
};

export default secureComponent(OverviewScreen);
