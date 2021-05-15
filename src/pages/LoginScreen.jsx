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

import Card from '../components/Card';
import { Helmet } from 'react-helmet';
import RouteConstants from '../constants/RouteConstants';
import { Link as RouterLink } from 'react-router-dom';
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
    props.rootStore.user
      .loginUser({
        email: formValues.email,
        password: formValues.password,
      })
      .then((response) => {})
      .catch((response) => {
        toast({
          title: 'Login failed',
          position: 'top-right',
          description: response.error.message,
          status: 'error',
          duration: 2000,
        });
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
            <Box textAlign='right' pt={5} fontSize={15}>
              <Link
                as={RouterLink}
                to={RouteConstants.FORGOT_PASSWORD}
                color='blue.500'
              >
                Forgot password
              </Link>
            </Box>
            <Box mt={5} textAlign='center'>
              <Button
                type='submit'
                colorScheme={'blue'}
                isDisabled={props.rootStore.user.isUserActionLoading}
                isLoading={props.rootStore.user.isUserActionLoading}
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

export default withContext(LoginScreen);
