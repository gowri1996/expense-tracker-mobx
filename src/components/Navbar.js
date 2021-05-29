import { Box, Text, VStack, useColorMode } from '@chakra-ui/react';

import AppUtils from '../utils/AppUtils';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ThemeConstants from '../constants/ThemeConstants';
import { isEmpty } from 'lodash';
import { useLocation } from 'react-router-dom';
import { withContext } from '../app/datastores/RootStoreContext';

const Navbar = (props) => {
  const location = useLocation();
  const { colorMode } = useColorMode();

  if (isEmpty(props.rootStore.userStore.email)) return <></>;
  return (
    <Box
      p={4}
      as='nav'
      position='sticky'
      top='50px'
      h='calc(100vh - 50px)'
      boxShadow='md'
      overflowY='auto'
      width={{
        md: '100px',
        lg: '100px',
        xl: '100px',
        xxl: '250px',
      }}
      display={{
        xs: 'none',
        sm: 'none',
        md: 'block',
        lg: 'block',
        xl: 'block',
        xxl: 'block',
      }}
      bg={colorMode === ThemeConstants.LIGHT_THEME ? 'white' : 'gray.900'}
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
                pl={2}
                width='full'
                borderRadius={5}
                key={nav.ROUTE}
                as={RouterLink}
                to={nav.ROUTE}
                bg={
                  nav.ROUTE === location.pathname
                    ? colorMode === ThemeConstants.LIGHT_THEME
                      ? 'gray.200'
                      : 'gray.600'
                    : undefined
                }
              >
                <Text>{nav.TEXT}</Text>
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
