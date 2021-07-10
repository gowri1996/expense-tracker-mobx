import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AppUtils from '../../utils/AppUtils';
import Card from '../../components/card/Card';
import CardContent from '../../components/card/CardContent';
import CreateUpdateExpenseModal from './overviewScreen/CreateUpdateExpenseModal';
import DeleteExpenseModal from './overviewScreen/DeleteExpenseModal';
import ExpenseCard from './overviewScreen/ExpenseCard';
import { FaPlus } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import Service from '../../api/Service';
import { secureComponent } from '../../components/SecureComponent';

const OverviewScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [
    isCreateUpdateExpenseModalVisible,
    setCreateUpdateExpenseModalVisible,
  ] = useState(false);
  const [isDeleteExpenseModalVisible, setDeleteExpenseModalVisible] =
    useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
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

  const onSubmit = (expenseValues) => {
    if (selectedExpense) updateExpense(selectedExpense._id, expenseValues);
    else createExpense(expenseValues);
  };

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
        setSelectedExpense(null);
        setCreateUpdateExpenseModalVisible(false);
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

  const updateExpense = (expenseId, expenseValues) => {
    setLoading(true);
    props.rootStore.userStore
      .updateExpense(expenseId, {
        name: expenseValues.name,
        expense: expenseValues.expense,
        category: expenseValues.category,
        description: expenseValues.description,
      })
      .then(() => {
        setSelectedExpense(null);
        setCreateUpdateExpenseModalVisible(false);
        toast(
          AppUtils.successToastMessage({
            title: 'Expense updated',
          })
        );
      })
      .catch((error) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'Expense cannot be updated',
            description: error.message,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteExpense = () => {
    setLoading(true);
    props.rootStore.userStore
      .deleteExpense(selectedExpense._id)
      .then(() => {
        setSelectedExpense(null);
        setDeleteExpenseModalVisible(false);
        toast(
          AppUtils.successToastMessage({
            title: 'Expense deleted',
          })
        );
      })
      .catch((error) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'Expense cannot be deleted',
            description: error.message,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      <Box p={4} height='full'>
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
                  setCreateUpdateExpenseModalVisible(true);
                }}
              />
            </Tooltip>
          </Box>
        </Flex>
        {props.rootStore.userStore.expenses.length > 0 ? (
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
                <ExpenseCard
                  data={expense}
                  width='full'
                  onUpdateExpenseClick={() => {
                    setSelectedExpense(expense);
                    setCreateUpdateExpenseModalVisible(true);
                  }}
                  onDeleteExpenseClick={() => {
                    setSelectedExpense(expense);
                    setDeleteExpenseModalVisible(true);
                  }}
                />
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Box
            mt='15vh'
            mx='auto'
            width={{
              xs: '70%',
              sm: '70%',
              md: '50%',
            }}
          >
            <Card p={7}>
              <CardContent>
                <Center>
                  <Text>
                    {`Hey ${props.rootStore.userStore.firstName}, add some expenses `}
                    &#128512;
                  </Text>
                </Center>
              </CardContent>
            </Card>
          </Box>
        )}
        <CreateUpdateExpenseModal
          visible={isCreateUpdateExpenseModalVisible}
          expense={selectedExpense}
          loading={loading}
          categories={categories}
          onSubmit={onSubmit}
          onClose={() => {
            setSelectedExpense(null);
            setCreateUpdateExpenseModalVisible(false);
          }}
        />
        <DeleteExpenseModal
          visible={isDeleteExpenseModalVisible}
          loading={loading}
          deleteExpense={deleteExpense}
          onClose={() => {
            setSelectedExpense(null);
            setDeleteExpenseModalVisible(false);
          }}
        />
      </Box>
    </>
  );
};

export default secureComponent(OverviewScreen);
