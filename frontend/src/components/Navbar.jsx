import { Box, Text, VStack, useColorMode } from '@chakra-ui/react';

import AppUtils from '../utils/AppUtils';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ThemeConstants from '../constants/ThemeConstants';
import isEmpty from 'lodash.isempty';
import { useLocation } from 'react-router-dom';
import { withContext } from '../app/datastores/RootStoreContext';

const Navbar = (props) => {
  const location = useLocation();
  const { colorMode } = useColorMode();

  if (isEmpty(props.rootStore.userStore._id)) return <></>;
  return (
    <Box
      p={4}
      as='nav'
      position='sticky'
      top='50px'
      h='calc(100vh - 50px)'
      boxShadow='sm'
      overflowY='auto'
      width={{
        md: '100px',
        lg: '100px',
        xl: '100px',
        xxl: '300px',
      }}
      display={{
        xs: 'none',
        sm: 'none',
        md: 'block',
        lg: 'block',
        xl: 'block',
        xxl: 'block',
      }}
      bg={colorMode === ThemeConstants.LIGHT_THEME ? '#FCFCFC' : '#181818'}
    >
      <Box
        display={{
          xs: 'none',
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'none',
          xxl: 'block',
        }}
      >
        <VStack alignItems='flex-start' spacing='25px'>
          {AppUtils.getNavLinks().map((nav) => {
            return (
              <Box
                py={2}
                px={2}
                width='full'
                borderRadius={5}
                key={nav.ROUTE}
                as={RouterLink}
                to={nav.ROUTE}
                bg={
                  nav.ROUTE === location.pathname
                    ? colorMode === ThemeConstants.LIGHT_THEME
                      ? '#EDEEEF'
                      : '#080808'
                    : undefined
                }
              >
                <Text float='left'>{nav.TEXT}</Text>
                <Text float='right'>
                  {props.rootStore.userStore.expenses.length}
                </Text>
              </Box>
            );
          })}
        </VStack>
      </Box>
      <Box
        display={{
          xs: 'none',
          sm: 'none',
          md: 'block',
          lg: 'block',
          xl: 'block',
          xxl: 'none',
        }}
      >
        {/* Images for nav bar links */}
      </Box>
    </Box>
  );
};

export default withContext(Navbar);
