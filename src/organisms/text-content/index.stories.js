import { storiesOf } from "@storybook/react";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import mocks from "./mocks.json";
import TextContent from "./TextContent";
storiesOf("TextContent", TextContent)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Story />
    </WithPilaTheme>
  ))
  .add("default", () => <TextContent {...mocks} />);
