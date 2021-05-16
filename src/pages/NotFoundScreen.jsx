import { Center, HStack, Spacer, Text } from '@chakra-ui/react';

import Card from '../components/Card';

const NotFoundScreen = () => {
  return (
    <Card mt={'200px !important'} p={10} maxWidth={500}>
      <Center>
        <HStack>
          <Text>404</Text>
          <Spacer />
          <Text>|</Text>
          <Spacer />
          <Text>This page could not be found</Text>
        </HStack>
      </Center>
    </Card>
  );
};

export default NotFoundScreen;
