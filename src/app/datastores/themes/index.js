import breakpoints from './breakpoint';
import button from './components/button';
import { extendTheme } from '@chakra-ui/react';
import { global } from './styles';
import input from './components/input';
import link from './components/link';
import spinner from './components/spinner';

export default extendTheme({
  breakpoints,
  styles: {
    global,
  },
  components: {
    Spinner: spinner,
    Link: link,
    Input: input,
    Button: button,
  },
  config: { useSystemColorMode: true },
});
