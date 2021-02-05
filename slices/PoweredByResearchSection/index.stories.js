import { storiesOf } from "@storybook/react";
import React from "react";

import WithPilaTheme from "../../Helpers/Storybook/WithPilaTheme";
import Component from "./";
import mocks from "./mocks.json";
import model from "./model";

mocks.forEach((variation) => {
  storiesOf(model.name, Component)
    .addDecorator((Story) => (
      <WithPilaTheme>
        <Story />
      </WithPilaTheme>
    ))
    .add(variation.name, () => <Component slice={variation} />);
});
