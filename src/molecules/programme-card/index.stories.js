import { storiesOf } from "@storybook/react";
import { Grid } from "grommet";
import React from "react";

import WithPilaTheme from "../../../helpers/storybook/WithPilaTheme";
import Section from "../../layout/section/Section";
import ProgrammeCard from "./ProgrammeCard";

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

storiesOf("ProgrammeCard", ProgrammeCard)
  .addDecorator((Story) => (
    <WithPilaTheme>
      <Section justify={"center"} flex>
        <Grid columns={"medium"}>
          <Story />
        </Grid>
      </Section>
    </WithPilaTheme>
  ))
  .add("default", () => <ProgrammeCard {...props} />);
