import { Box } from '@chakra-ui/react';
import ThemeConstants from '../constants/ThemeConstants';
import { useColorMode } from '@chakra-ui/react';

const Card = ({ children, ...rest }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      boxShadow='md'
      borderWidth={1}
      borderRadius={30}
      bg={colorMode === ThemeConstants.LIGHT_THEME ? '#FCFCFC' : '#181818'}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Card;
