import { mode } from '@chakra-ui/theme-tools';

const modal = {
  baseStyle: (props) => {
    const bg = mode('#FCFCFC', '#181818')(props);
    return {
      dialog: {
        borderRadius: 'lg',
        bg: bg,
        zIndex: 'modal',
      },
      closeButton: {
        _active: {
          borderColor: bg,
        },
        _focus: {
          borderColor: bg,
        },
        color: 'red',
      },
    };
  },
};

export default modal;
