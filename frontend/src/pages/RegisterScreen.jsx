import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import AppUtils from '../utils/AppUtils';
import Card from '../components/card/Card';
import { Helmet } from 'react-helmet';
import RouteConstants from '../constants/RouteConstants';
import { withContext } from '../app/datastores/RootStoreContext';

const RegisterScreen = (props) => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleFormInputChange = (name, value) => {
    const data = { ...formValues, [name]: value };
    setFormValues(data);
  };

  const toast = useToast();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    props.rootStore.userStore
      .registerUser({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      })
      .then(() => {
        toast(
          AppUtils.successToastMessage({
            title: 'Registration success',
            description: 'Login using the credentials',
          })
        );
        history.replace(RouteConstants.LOGIN);
      })
      .catch((error) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'Registration failed',
            description: error.message,
          })
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Register | Expense Tracker</title>
      </Helmet>
      <Box
        style={{ margin: 'auto' }}
        width={{
          xs: '95%',
          sm: '70%',
          md: '50%',
          lg: '40%',
          xl: '40%',
          xxl: '35%',
        }}
      >
        <Card p={4}>
          <Card.Header title='Register' />
          <Card.Content p={4} textAlign='left'>
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name='firstName'
                  placeholder='Enter your first name'
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name='lastName'
                  placeholder='Enter your last name'
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name='email'
                  type='email'
                  placeholder='Enter your email address'
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                  onChange={(evt) =>
                    handleFormInputChange(
                      evt.currentTarget.name,
                      evt.currentTarget.value
                    )
                  }
                />
              </FormControl>
              <Box textAlign='left' pt={3}>
                <Link
                  as={RouterLink}
                  to={RouteConstants.LOGIN}
                  color='blue.500'
                >
                  Already have an account ?
                </Link>
              </Box>
              <Box mt={7} textAlign='center'>
                <Button type='submit' isLoading={loading}>
                  Sign Up
                </Button>
              </Box>
            </form>
          </Card.Content>
        </Card>
      </Box>
    </>
  );
};

export default withContext(RegisterScreen);
