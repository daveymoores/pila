import { Card, Layer, Spinner, Text } from "grommet";
import React from "react";

import DictionaryContext from "../../context/DictionaryContext";

const Loader: React.FC = () => {
  const { getDictionaryValue } = React.useContext(DictionaryContext);

  return (
    <Layer>
      <Card
        align="center"
        justify="center"
        gap="small"
        direction="row"
        alignSelf="center"
        pad="large"
      >
        <Spinner />
        <Text>{getDictionaryValue("Loading...")}</Text>
      </Card>
    </Layer>
  );
};

export default Loader;
