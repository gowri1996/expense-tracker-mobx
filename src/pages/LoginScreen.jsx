import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import AppUtils from '../utils/AppUtils';
import Card from '../components/Card';
import { Helmet } from 'react-helmet';
import RouteConstants from '../constants/RouteConstants';
import { useState } from 'react';
import { withContext } from '../app/datastores/RootStoreContext';

const LoginScreen = (props) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const toast = useToast();

  const handleFormInputChange = (name, value) => {
    const data = { ...formValues, [name]: value };
    setFormValues(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.rootStore.userStore
      .loginUser({
        email: formValues.email,
        password: formValues.password,
      })
      .then((response) => {
        console.log(response.result);
      })
      .catch((response) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'Login failed',
            description: response.error.message,
          })
        );
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Card mt={'100px !important'} p={4} maxWidth={500}>
        <Box p={4} textAlign='center'>
          <Heading size='lg'>Login</Heading>
        </Box>
        <Box p={4} textAlign='left'>
          <form onSubmit={onSubmit}>
            <FormControl isRequired>
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
            <HStack pt={5} fontSize={15} justifyContent='space-between'>
              <Link
                as={RouterLink}
                to={RouteConstants.REGISTER}
                color='blue.500'
              >
                Don't have an account?
              </Link>
              <Link
                as={RouterLink}
                to={RouteConstants.FORGOT_PASSWORD}
                color='blue.500'
              >
                Forgot password
              </Link>
            </HStack>
            <Box mt={7} textAlign='center'>
              <Button
                type='submit'
                colorScheme={'blue'}
                isDisabled={props.rootStore.userStore.isUserActionLoading}
                isLoading={props.rootStore.userStore.isUserActionLoading}
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </>
  );
};

export default withRouter(withContext(LoginScreen));