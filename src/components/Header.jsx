import {
  Box,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { FaHamburger, FaMoon, FaSun } from 'react-icons/fa';

import AppUtils from '../utils/AppUtils';
import React from 'react';
import RouteConstants from '../constants/RouteConstants';
import ThemeConstants from '../constants/ThemeConstants';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import { withContext } from '../app/datastores/RootStoreContext';

const Header = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const history = useHistory();

  const logout = () => {
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
      });
  };

  return (
    <Box
      as='header'
      height='50px'
      width='full'
      position='sticky'
      boxShadow='md'
      backgroundColor={
        colorMode === ThemeConstants.LIGHT_THEME
          ? ThemeConstants.LIGHT_THEME_PRIMARY_COLOR
          : ThemeConstants.DARK_THEME_PRIMARY_COLOR
      }
      top={0}
      zIndex={1}
    >
      <Box
        textAlign='right'
        color={colorMode === ThemeConstants.LIGHT_THEME ? 'black' : 'white'}
      >
        <Tooltip label='Toggle light/dark theme' fontSize='xs' placement='left'>
          <IconButton
            aria-label='themeIcon'
            icon={
              colorMode === ThemeConstants.LIGHT_THEME ? <FaSun /> : <FaMoon />
            }
            mt={1}
            mr={2}
            size='md'
            onClick={() => {
              toggleColorMode();
            }}
          />
        </Tooltip>
        {!isEmpty(props.rootStore.userStore.email) && (
          <Menu>
            <Tooltip label='Actions' fontSize='xs' placement='left'>
              <MenuButton
                as={Button}
                aria-label='actions'
                size='md'
                isLoading={props.rootStore.userStore.isUserActionLoading}
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
    </Box>
  );
};

export default withContext(Header);
