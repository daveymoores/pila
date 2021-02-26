import { storiesOf } from "@storybook/react";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import HeroImage from "./HeroImage";

storiesOf("HeroImage", HeroImage)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Story />
    </WithPilaTheme>
  ))
  .add("default", () => <HeroImage />);
