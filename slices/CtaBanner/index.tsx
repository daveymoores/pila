import { Card, CardBody, CardHeader, Heading } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../src/atoms/button/Button";
import Section from "../../src/layout/section/Section";
import ResponsiveGrid from "../../src/organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../src/theme/pila";

type Primary = {
  title: RichTextBlock[];
  buttonOneLink: Link;
  buttonTwoLink: Link;
  buttonOneLabel: string;
  buttonTwoLabel: string;
};

interface CtaBannerProps {
  slice: {
    primary: Primary;
  };
}

const CtaBanner: FC<CtaBannerProps> = ({ slice }) => {
  const {
    primary: {
      title,
      buttonOneLink,
      buttonOneLabel = "Button Label",
      buttonTwoLink,
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
              href={buttonOneLink.url}
              primary
              color={colorPalette.yellow}
              size={ButtonSizes.large}
              type="button"
              label={buttonOneLabel}
            />
            <Button
              margin={"small"}
              href={buttonTwoLink.url}
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

export default CtaBanner;