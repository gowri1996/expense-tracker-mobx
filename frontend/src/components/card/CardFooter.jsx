import { Box, Center, Divider, SimpleGrid } from '@chakra-ui/react';

import React from 'react';
import isEmpty from 'lodash.isempty';

const CardFooter = ({ actions, ...rest }) => {
  return !isEmpty(actions) ? (
    <Box>
      <Divider mt={5} />
      <SimpleGrid columns={actions.length} spacing={4} height='50' {...rest}>
        {actions.map((ActionComponent, index) => (
          <React.Fragment key={index}>
            <Center>{ActionComponent}</Center>
          </React.Fragment>
        ))}
      </SimpleGrid>
    </Box>
  ) : (
    <></>
  );
};

export default CardFooter;
