import { storiesOf } from "@storybook/react";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import Navigation from "./Navigation";

storiesOf("Navigation", Navigation)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Story />
    </WithPilaTheme>
  ))
  .add("default", () => <Navigation />);
