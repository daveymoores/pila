import { storiesOf } from "@storybook/react";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import ModuleHero from "./ModuleHero";

const mocks = {
  title: [
    {
      type: "heading1",
      text: "Programming",
      spans: [],
    },
  ],
  body: [
    {
      type: "paragraph",
      text:
        "Computational thinking allows individuals to create, organise, express, collaborate and share ideas using digital tools. Computational thinking is increasingly important in our digitalised world, where computers provide enhanced opportunities to understand the world, communicate ideas and design new solutions to complex problems. In this module, students will be assessed on their ability to learn and use computational thinking in various digital contexts.",
      spans: [],
    },
  ],
  programmeGuideDownload: {
    link_type: "Web",
    url: "https://slicemachine.dev",
  },
  programmeGuideLink: {
    link_type: "Web",
    url: "https://slicemachine.dev",
  },
};

storiesOf("ModuleHero", ModuleHero)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Story />
    </WithPilaTheme>
  ))
  .add("default", () => <ModuleHero {...mocks} />);
