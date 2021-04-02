import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Paragraph,
  ResponsiveContext,
} from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../src/atoms/button/Button";
import Section from "../../src/layout/section/Section";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";
import Slice from "../../types/Slice";

type Primary = {
  title: RichTextBlock[];
  body: RichTextBlock[];
  buttonOneLink: Link;
  buttonTwoLink: Link;
  buttonOneLabel: string;
  buttonTwoLabel: string;
};

export type HighlightBannerProps = Slice<Primary, never>;

const HighlightBanner: FC<{ slice: HighlightBannerProps }> = ({ slice }) => {
  const {
    primary: {
      title,
      body,
      buttonOneLink,
      buttonOneLabel,
      buttonTwoLink,
      buttonTwoLabel,
    },
  } = slice;
  const size = React.useContext(ResponsiveContext);

  return (
    <Section justify={"center"} flex>
      <ResponsiveGrid margin="medium" columns="large" rows="1">
        <StyledCard
          elevation={"xlarge"}
          pad={"large"}
          background={colorPalette.green}
          align={"center"}
          justify={"center"}
          margin={{ top: "xlarge", bottom: "xlarge" }}
        >
          <CardHeader direction={"column"}>
            {title && (
              <Heading
                level={"1"}
                margin="none"
                size="small"
                color={"white"}
                textAlign={"center"}
              >
                {RichText.asText(title)}
              </Heading>
            )}
            {body && (
              <Paragraph
                color={"white"}
                textAlign={"center"}
                margin="none"
                fill
              >
                {RichText.asText(body)}
              </Paragraph>
            )}
          </CardHeader>
          <CardBody
            margin={{ top: "medium" }}
            direction={size === "small" ? "column" : "row"}
            justify={"stretch"}
            align={"stretch"}
            flex={"shrink"}
          >
            {buttonOneLink && buttonOneLabel && (
              <Button
                margin={"small"}
                primary
                color={colorPalette.yellow}
                size={ButtonSizes.large}
                type="button"
                label={buttonOneLabel}
                link={buttonOneLink}
              />
            )}
            {buttonTwoLink && buttonTwoLabel && (
              <Button
                margin={"small"}
                primary
                color={colorPalette.yellow}
                size={ButtonSizes.large}
                type="button"
                label={buttonTwoLabel}
                link={buttonTwoLink}
              />
            )}
          </CardBody>
        </StyledCard>
      </ResponsiveGrid>
    </Section>
  );
};

const StyledCard = styled(Card)`
  border-radius: 25px;
  min-height: 380px;
`;

export default HighlightBanner;
