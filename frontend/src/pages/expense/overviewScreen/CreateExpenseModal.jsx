import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AppUtils from '../../../utils/AppUtils';
import Service from '../../../api/Service';
import { withContext } from '../../../app/datastores/RootStoreContext';

const CreateExpenseModal = (props) => {
  const toast = useToast();

  const [expenseValues, setExpenseValues] = useState({
    name: '',
    expense: 0,
    category: '',
    description: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Service.getExpenseCategories()
      .then((categories) => {
        setCategories(categories);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast(
          AppUtils.errorToastMessage({
            title: 'Could not load categories',
            description: error.message,
          })
        );
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.visible) {
      categories.length > 0 &&
        handleFormInputChange('category', categories[0]._id);
    } else {
      setExpenseValues({
        name: '',
        expense: 0,
        category: '',
        description: '',
      });
    }
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormInputChange = (name, value) => {
    const data = { ...expenseValues, [name]: value };
    setExpenseValues(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
    <Modal
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      isOpen={props.visible}
      onClose={props.onClose}
      size='lg'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4} textAlign='left'>
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name='name'
                  value={expenseValues.name}
                  placeholder='Expense name'
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Expense Amount</FormLabel>
                <NumberInput
                  min={0}
                  value={expenseValues.expense}
                  placeholder='Expense amount'
                  onChange={(value) => {
                    handleFormInputChange('expense', Number(value));
                  }}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  name='category'
                  value={expenseValues.category}
                  onChange={(evt) => {
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    );
                  }}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name='description'
                  placeholder='Description for your expense'
                  value={expenseValues.description}
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <Box mt={7} textAlign='center'>
                <Button variant='danger' mr={5} onClick={props.onClose}>
                  Close
                </Button>
                <Button type='submit' isLoading={loading}>
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default withContext(CreateExpenseModal);
