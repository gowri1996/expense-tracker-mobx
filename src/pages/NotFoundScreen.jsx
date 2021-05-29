import { Box, Center, HStack, Spacer, Text } from '@chakra-ui/react';

import Card from '../components/Card';

const NotFoundScreen = () => {
  return (
    <Box style={{ marginTop: '25vh' }} width={500} maxWidth={500}>
      <Card p={10}>
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
    </Box>
  );
};

export default NotFoundScreen;
