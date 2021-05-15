import { FaMoon, FaSun } from 'react-icons/fa';
import { IconButton, useColorMode } from '@chakra-ui/react';

import React from 'react';
import ThemeConstants from '../constants/ThemeConstants';

const Header = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === ThemeConstants.LIGHT_THEME ? <FaSun /> : <FaMoon />}
      isRound='true'
      size='md'
      alignSelf='flex-end'
      onClick={() => {
        toggleColorMode();
      }}
    />
  );
};

export default Header;
