import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';

import Card from '../components/Card';
import { Helmet } from 'react-helmet';
import RouteConstants from '../constants/RouteConstants';
import { useState } from 'react';
import { withContext } from '../app/datastores/RootStoreContext';
import { withRouter } from 'react-router';

const ForgotPasswordScreen = (props) => {
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
      .resetPasswordUser({
        email: formValues.email,
        password: formValues.password,
      })
      .then((response) => {
        props.history.replace(RouteConstants.LOGIN);
      })
      .catch((response) => {
        toast({
          title: 'Reset password failed',
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
        <title>Forgot Password</title>
      </Helmet>
      <Card mt={'100px !important'} p={4} maxWidth={500}>
        <Box p={4} textAlign='center'>
          <Heading size='lg'>Forgot Password</Heading>
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
              <FormLabel>New Password</FormLabel>
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
            <Box mt={8} textAlign='center'>
              <Button
                type='submit'
                colorScheme={'blue'}
                isDisabled={props.rootStore.user.isUserActionLoading}
                isLoading={props.rootStore.user.isUserActionLoading}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </>
  );
};

export default withRouter(withContext(ForgotPasswordScreen));
