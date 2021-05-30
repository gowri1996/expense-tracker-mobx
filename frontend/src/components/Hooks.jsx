import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
  const toast = useToast();
  return toast;
};

export const withToast = (Component) => {
  return (props) => {
    const toast = useCustomToast();
    return <Component {...props} toast={toast} />;
  };
};
