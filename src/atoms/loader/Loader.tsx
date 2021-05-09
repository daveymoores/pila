import { Card, Layer, Spinner, Text } from "grommet";
import React from "react";

const Loader: React.FC = () => (
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
      <Text>Loading...</Text>
    </Card>
  </Layer>
);

export default Loader;
