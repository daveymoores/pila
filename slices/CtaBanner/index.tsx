import { Card, CardBody, CardHeader, Heading, Paragraph } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../src/atoms/button/Button";
import Section from "../../src/layout/section/Section";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";

type Primary = {
  title: RichTextBlock[];
  description: RichTextBlock[];
  buttonOne: Link;
  buttonTwo: Link;
  buttonOneLabel: string;
  buttonTwoLabel: string;
};

interface CtaBannerProps {
  slice: {
    primary: Primary;
  };
}

const FullWidthImageSection: FC<CtaBannerProps> = ({ slice }) => {
  const {
    primary: {
      title,
      description,
      buttonOne,
      buttonOneLabel = "Button Label",
      buttonTwo,
      buttonTwoLabel = "Button Label",
    },
  } = slice;
  return (
    <Section justify={"center"} flex>
      <ResponsiveGrid margin="medium" columns="large" rows="1">
        <StyledCard
          elevation={"xlarge"}
          pad={"large"}
          background={colorPalette.green}
          align={"center"}
          justify={"center"}
        >
          <CardHeader direction={"column"}>
            {title && (
              <Heading
                level={"1"}
                margin="none"
                size="small"
                responsive={false}
                color={"white"}
                textAlign={"center"}
              >
                {RichText.asText(title)}
              </Heading>
            )}
            {/*description && (
              <Paragraph
                color={"white"}
                textAlign={"center"}
                margin="none"
                fill
              >
                {RichText.asText(description)}
              </Paragraph>
            )*/}
          </CardHeader>
          <CardBody
            margin={{ top: "medium" }}
            direction={"row"}
            justify={"center"}
            align={"start"}
            flex={"shrink"}
          >
            <Button
              margin={"small"}
              href={buttonOne.url}
              primary
              color={colorPalette.yellow}
              size={ButtonSizes.large}
              type="button"
              label={buttonOneLabel}
            />
            <Button
              margin={"small"}
              href={buttonTwo.url}
              primary
              color={colorPalette.yellow}
              size={ButtonSizes.large}
              type="button"
              label={buttonTwoLabel}
            />
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

export default FullWidthImageSection;
