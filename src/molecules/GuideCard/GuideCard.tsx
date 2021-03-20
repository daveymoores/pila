import { Box, Card, Grid, Paragraph, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import ResponsiveGrid from "../../organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../theme/pila";

export enum CardVariant {
  SMALL = "small",
  LARGE = "large",
}

interface GuideCardProps {
  title: string;
  downloadLink: Link;
  pageLink: Link;
  variant?: CardVariant;
}

const GuideCard: React.FC<GuideCardProps> = ({
  title,
  downloadLink,
  pageLink,
  variant = CardVariant.LARGE,
}) => {
  const isSmall = variant === CardVariant.SMALL;

  const columns = isSmall
    ? {
        small: ["1/2", "1/2"],
        medium: ["1/2", "1/2"],
        large: ["1/2", "1/2"],
        xlarge: ["1/2", "1/2"],
      }
    : {
        small: ["1/2", "1/2"],
        medium: ["1/3", "1/3", "1/3"],
        large: ["1/3", "1/3", "1/3"],
        xlarge: ["1/3", "1/3", "1/3"],
      };

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Card
          width={"100%"}
          elevation={"none"}
          pad={isSmall ? "small" : "medium"}
          background={isSmall ? "light-1" : "white"}
          direction={"row"}
          align={"center"}
          justify={"between"}
          margin={{ bottom: "medium" }}
        >
          <StyledResponsiveGrid
            align={"center"}
            gap={"none"}
            rows={"1"}
            columns={columns}
            pad={{ left: "small" }}
          >
            <React.Fragment>
              <Paragraph
                style={{ fontWeight: "bold" }}
                color={isSmall ? colorPalette.dark_blue : colorPalette.grey}
                size={size !== "small" ? "medium" : "small"}
              >
                {title}
              </Paragraph>
              {size !== "small" && !isSmall && (
                <Box align={"center"} justify={"center"}>
                  <dl>
                    <dt>
                      <Paragraph size={"small"} color={colorPalette.grey}>
                        Format
                      </Paragraph>
                    </dt>
                    <dd>
                      <StyledParagraph size={"small"} color={colorPalette.grey}>
                        PDF
                      </StyledParagraph>
                    </dd>
                  </dl>
                </Box>
              )}
              <Box direction={"row"} align={"center"} justify={"end"}>
                <Button
                  color={colorPalette.green}
                  size={ButtonSizes.small}
                  label={"Download"}
                  link={downloadLink}
                />
                <Button
                  primary
                  color={colorPalette.blue}
                  size={ButtonSizes.small}
                  label={"View"}
                  link={pageLink}
                  margin={{ left: size !== "small" ? "medium" : "small" }}
                />
              </Box>
            </React.Fragment>
          </StyledResponsiveGrid>
        </Card>
      )}
    </ResponsiveContext.Consumer>
  );
};

const StyledResponsiveGrid = styled(ResponsiveGrid)`
  width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
`;

export default GuideCard;
