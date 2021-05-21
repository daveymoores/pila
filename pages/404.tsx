import { Box, Heading } from "grommet";
import React from "react";

import DictionaryContext from "../src/context/DictionaryContext";
import Section from "../src/layout/section/Section";

const Custom404: React.FC = () => {
  const { getDictionaryValue } = React.useContext(DictionaryContext);

  return (
    <Section>
      <Box height={{ min: "60vh" }} justify={"center"} align={"center"}>
        <Heading level={1} size={"large"}>
          404
        </Heading>
        <Heading margin={{ top: "medium" }} level={2} size={"small"}>
          {getDictionaryValue("Page not found")}
        </Heading>
      </Box>
    </Section>
  );
};

export default Custom404;
