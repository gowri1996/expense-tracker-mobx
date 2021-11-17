import { Box, Heading } from "@chakra-ui/react";

import { Helmet } from "react-helmet";
import React from "react";
import secureComponent from "../../components/SecureComponent";

const AnalyticsScreen = (props) => {
  return (
    <>
      <Helmet>
        <title>Analytics | Expense Tracker</title>
      </Helmet>
      <Box>
        <Heading fontWeight={300} letterSpacing={0.5}>
          Analytics
        </Heading>
      </Box>
    </>
  );
};

export default secureComponent(AnalyticsScreen);
