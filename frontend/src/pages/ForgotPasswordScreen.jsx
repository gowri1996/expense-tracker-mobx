import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';

import AppUtils from '../utils/AppUtils';
import Card from '../components/Card';
import { Helmet } from 'react-helmet';
import RouteConstants from '../constants/RouteConstants';
import { unsecureComponent } from '../components/UnsecureComponent';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const ForgotPasswordScreen = (props) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const handleFormInputChange = (name, value) => {
    const data = { ...formValues, [name]: value };
    setFormValues(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    props.rootStore.userStore
      .resetPasswordUser({
        email: formValues.email,
        password: formValues.password,
      })
      .then(() => {
        toast(
          AppUtils.successToastMessage({
            title: 'Reset password success',
            description: 'Login using the credentials',
          })
        );
        history.replace(RouteConstants.LOGIN);
      })
      .catch((error) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'Reset password failed',
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
        <title>Forgot Password</title>
      </Helmet>
      <Box style={{ marginTop: '15vh' }} width={500} maxWidth={500}>
        <Card p={4}>
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
                <Button type='submit' isLoading={loading}>
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default unsecureComponent(ForgotPasswordScreen);
