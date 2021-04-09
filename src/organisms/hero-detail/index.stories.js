import { storiesOf } from "@storybook/react";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import HeroDetail from "./HeroDetail";

const props = {
  title: [
    {
      type: "paragraph",
      text:
        "Elit aliqua voluptate velit pariatur nulla ex sint qui quis culpa anim aliquip commodo. Aliqua elit sit ullamco. Qui nostrud dolore do et duis.",
      spans: [],
    },
  ],
  description: [
    {
      type: "paragraph",
      text:
        "Dolor eiusmod veniam commodo aliquip. Cillum veniam cillum excepteur aliqua aliqua. Nostrud occaecat fugiat officia.",
      spans: [],
    },
  ],
  // heroImage: {
  //   dimensions: {
  //     width: 900,
  //     height: 500,
  //   },
  //   alt: "Placeholder image",
  //   copyright: null,
  //   url:
  //     "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&h=500&fit=crop",
  // },
  imageSide: "image_left",
  linkLabel: "facilitate dynamic applications",
  link: {
    link_type: "Web",
    url: "http://twitter.com",
  },
  backgroundColor: "grey",
};

storiesOf("HeroDetail", HeroDetail)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Story />
    </WithPilaTheme>
  ))
  .add("default", () => <HeroDetail {...props} />);
