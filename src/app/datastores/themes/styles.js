import { mode } from '@chakra-ui/theme-tools';

export const global = (props) => {
  return {
    body: {
      bg: mode('gray.50', 'black')(props),
      color: mode('black', 'white')(props),
    },
  };
};
