import { Box } from '@chakra-ui/react';

const Card = ({ children, ...rest }) => {
  return (
    <Box boxShadow='lg' borderWidth={1} borderRadius={4} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
