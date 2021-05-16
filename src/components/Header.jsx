import { Box, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

import React from 'react';
import ThemeConstants from '../constants/ThemeConstants';

const Header = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      p={2}
      width='full'
      backgroundColor='blue.500'
      boxShadow='md'
      position='sticky'
      top='0px'
      zIndex={1}
    >
      <Box textAlign='right'>
        <Tooltip label='Toggle light/dark theme' fontSize='xs'>
          <IconButton
            icon={
              colorMode === ThemeConstants.LIGHT_THEME ? <FaSun /> : <FaMoon />
            }
            size='xs'
            onClick={() => {
              toggleColorMode();
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
