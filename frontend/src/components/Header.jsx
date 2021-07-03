import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tooltip,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { FaHamburger, FaInfo, FaMoon, FaSun } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import AppUtils from '../utils/AppUtils';
import RouteConstants from '../constants/RouteConstants';
import ThemeConstants from '../constants/ThemeConstants';
import isEmpty from 'lodash.isempty';
import { withContext } from '../app/datastores/RootStoreContext';

const Header = (props) => {
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const history = useHistory();

  const logout = () => {
    setLoading(true);
    props.rootStore.userStore
      .logoutUser()
      .then(() => {
        history.replace(RouteConstants.LOGIN);
      })
      .catch((error) => {
        toast(
          AppUtils.errorToastMessage({
            title: 'User could not be logged out',
            description: error.message,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      as='header'
      height='50px'
      width='full'
      position='sticky'
      boxShadow='sm'
      backgroundColor={
        colorMode === ThemeConstants.LIGHT_THEME
          ? ThemeConstants.LIGHT_THEME_PRIMARY_COLOR
          : ThemeConstants.DARK_THEME_PRIMARY_COLOR
      }
      top={0}
      zIndex={1}
    >
      <Flex
        color={colorMode === ThemeConstants.LIGHT_THEME ? '#121212' : '#D3D3D3'}
      >
        <Box>
          <IconButton
            aria-label='themeIcon'
            as={RouterLink}
            to={RouteConstants.LOGIN}
            icon={<FaInfo />}
            mt={1}
            mr={2}
            size='md'
          />
        </Box>
        <Spacer />
        <Box>
          <Tooltip
            label='Toggle light/dark theme'
            fontSize='xs'
            placement='left'
          >
            <IconButton
              aria-label='themeIcon'
              icon={
                colorMode === ThemeConstants.LIGHT_THEME ? (
                  <FaSun />
                ) : (
                  <FaMoon />
                )
              }
              mt={1}
              mr={2}
              size='md'
              onClick={() => {
                toggleColorMode();
              }}
            />
          </Tooltip>
          {!isEmpty(props.rootStore.userStore._id) && (
            <Menu>
              <Tooltip label='Actions' fontSize='xs' placement='left'>
                <MenuButton
                  as={Button}
                  aria-label='actions'
                  size='md'
                  isLoading={loading}
                >
                  <Icon as={FaHamburger} />
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default withContext(Header);
