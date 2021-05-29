import ThemeConstants from '../../../../constants/ThemeConstants';
import { mode } from '@chakra-ui/theme-tools';

const input = {
  variants: {
    outline: (props) => {
      const color = mode(
        ThemeConstants.LIGHT_THEME_PRIMARY_COLOR,
        ThemeConstants.DARK_THEME_PRIMARY_COLOR
      )(props);
      return {
        field: {
          _focus: {
            zIndex: 1,
            borderColor: color,
            boxShadow: `0 0 0 1px ${color}`,
          },
          _active: {
            zIndex: 1,
            borderColor: color,
            boxShadow: `0 0 0 1px ${color}`,
          },
        },
      };
    },
  },
};

export default input;
