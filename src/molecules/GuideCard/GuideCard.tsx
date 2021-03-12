import { Box, Card, Grid, Paragraph, ResponsiveContext } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import ResponsiveGrid from "../../organisms/responsive-grid/ResponsiveGrid";
import { colorPalette } from "../../theme/pila";

interface GuideCardProps {
  title: RichTextBlock[];
  downloadLink: Link;
  pageLink: Link;
}

const GuideCard: React.FC<GuideCardProps> = ({
  title,
  downloadLink,
  pageLink,
}) => (
  <ResponsiveContext.Consumer>
    {(size) => (
      <Card
        elevation={"none"}
        pad={"medium"}
        background={"white"}
        direction={"row"}
        align={"center"}
        justify={"between"}
        margin={{ bottom: "medium" }}
      >
        <StyledResponsiveGrid
          gap={"none"}
          rows={"1"}
          columns={{
            small: ["1/2", "1/2"],
            medium: ["1/3", "1/3", "1/3"],
            large: ["1/3", "1/3", "1/3"],
            xlarge: ["1/3", "1/3", "1/3"],
          }}
        >
          <React.Fragment>
            <Paragraph
              color={colorPalette.grey}
              size={size !== "small" ? "medium" : "small"}
            >
              {RichText.asText(title)}
            </Paragraph>
            {size !== "small" && (
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

const StyledResponsiveGrid = styled(ResponsiveGrid)`
  width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: bold;
`;

export default GuideCard;
