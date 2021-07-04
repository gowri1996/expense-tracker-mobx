import { Box, Center, HStack, Spacer, Text } from '@chakra-ui/react';

import Card from '../components/card/Card';
import CardContent from '../components/card/CardContent';

const NotFoundScreen = () => {
  return (
    <Box style={{ marginTop: '25vh' }} width={500} maxWidth={500}>
      <Card p={10}>
        <CardContent>
          <Center>
            <HStack>
              <Text>404</Text>
              <Spacer />
              <Text>|</Text>
              <Spacer />
              <Text>This page could not be found</Text>
            </HStack>
          </Center>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotFoundScreen;
