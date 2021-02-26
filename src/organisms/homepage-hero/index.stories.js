import { storiesOf } from "@storybook/react";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import HomepageHero from "./HomepageHero";

storiesOf("HomepageHero", HomepageHero)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Story />
    </WithPilaTheme>
  ))
  .add("default", () => <HomepageHero />);
