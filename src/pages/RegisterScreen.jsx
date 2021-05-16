import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import AppUtils from '../utils/AppUtils';
import Card from '../components/Card';
import { Helmet } from 'react-helmet';
import RouteConstants from '../constants/RouteConstants';
import { Link as RouterLink } from 'react-router-dom';
import { unsecureComponent } from '../components/UnsecureComponent';

const RegisterScreen = (props) => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleFormInputChange = (name, value) => {
    const data = { ...formValues, [name]: value };
    setFormValues(data);
  };

  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
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
        props.history.replace(RouteConstants.LOGIN);
      })
      .catch((error) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'Registration failed',
            description: error.message,
          })
        );
      });
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Card mt={'50px !important'} p={4} maxWidth={500}>
        <Box p={4} textAlign='center'>
          <Heading size='lg'>Register</Heading>
        </Box>
        <Box p={4} textAlign='left'>
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
              <Link as={RouterLink} to={RouteConstants.LOGIN} color='blue.500'>
                Already have an account ?
              </Link>
            </Box>
            <Box mt={7} textAlign='center'>
              <Button
                type='submit'
                colorScheme={'blue'}
                isDisabled={props.rootStore.userStore.isUserActionLoading}
                isLoading={props.rootStore.userStore.isUserActionLoading}
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </>
  );
};

export default unsecureComponent(RegisterScreen);
