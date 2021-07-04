import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

const Card = ({ children, ...rest }) => {
  return (
    <Box
      boxShadow='md'
      borderWidth={1}
      borderRadius={30}
      bg={useColorModeValue('#FCFCFC', '#181818')}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Card;
