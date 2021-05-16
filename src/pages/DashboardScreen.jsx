import React from 'react';
import { Text } from '@chakra-ui/react';
import { secureComponent } from '../components/SecureComponent';

const DashboardScreen = () => {
  return <Text>Dashboard</Text>;
};

export default secureComponent(DashboardScreen);
