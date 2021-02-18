import { storiesOf } from "@storybook/react";
import { Main } from "grommet";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import Section from "../../layout/section/Section";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";
import ProjectCard from "./ProjectCard";

const props = {
  src:
    "https://images.prismic.io/important-sm-images/0c1acf72-dbfa-442a-8a64-ab8c84d41263_jZ4rJ0yLyrs.jpg?w=300&h=200&fit=crop",
  title: [
    {
      type: "heading1",
      text: "monetize value-added e-commerce",
      spans: [],
    },
  ],
  body: [
    {
      type: "paragraph",
      text:
        "Exercitation elit esse occaecat fugiat excepteur nulla ad elit mollit consectetur eiusmod aute cillum ullamco.",
      spans: [],
    },
  ],
};

const columns = {
  small: ["auto"],
  medium: ["auto", "auto"],
  large: ["auto", "auto", "auto"],
  xlarge: ["1/3", "1/3", "1/3"],
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

storiesOf("ProjectCard", ProjectCard)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Section justify={"center"} flex>
        <ResponsiveGrid rows={rows} columns={columns}>
          <Story />
          <Story />
          <Story />
        </ResponsiveGrid>
      </Section>
    </WithPilaTheme>
  ))
  .add("default", () => <ProjectCard {...props} />);
