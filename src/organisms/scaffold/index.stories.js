import { storiesOf } from "@storybook/react";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import Scaffold from "./Scaffold";

storiesOf("Scaffold", Scaffold)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Story />
    </WithPilaTheme>
  ))
  .add("default", () => <Scaffold />);
