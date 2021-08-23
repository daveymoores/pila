import { Box, Card, Paragraph, ResponsiveContext } from "grommet";
import { Link } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import DownloadIcon from "../../atoms/download-icon/DownloadIcon";
import { MobileOnly } from "../../atoms/responsive-helpers/ResponsiveHelpers";
import DictionaryContext from "../../context/DictionaryContext";
import ResponsiveGrid from "../../organisms/responsive-grid/ResponsiveGrid";
import { colorPalette, fontWeights } from "../../theme/pila";

export enum CardVariant {
  SMALL = "small",
  LARGE = "large",
}

export enum CardColor {
  DARK = "dark",
  LIGHT = "light",
}

interface GuideCardProps {
  title?: string;
  downloadLink?: Link;
  pageLink?: Link;
  variant?: CardVariant;
  guideCategory?: string;
  color?: CardColor;
}

const GuideCard: React.FC<GuideCardProps> = ({
  title,
  downloadLink,
  pageLink,
  variant = CardVariant.LARGE,
  guideCategory,
  color = CardColor.LIGHT,
}) => {
  const { getDictionaryValue } = React.useContext(DictionaryContext);
  const isSmall = variant === CardVariant.SMALL;

  const columns = isSmall
    ? {
        small: ["flex", "auto"],
        medium: ["flex", "auto"],
        large: ["flex", "auto"],
      }
    : {
        small: ["1/2", "1/2"],
        medium: guideCategory ? ["1/2", "1/4", "1/4"] : ["2/3", "1/3"],
        large: guideCategory ? ["1/2", "1/4", "1/4"] : ["2/3", "1/3"],
      };

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Card
          width={"100%"}
          elevation={"none"}
          pad={isSmall ? "small" : size === "large" ? "medium" : "small"}
          background={
            isSmall
              ? color === CardColor.LIGHT
                ? "light-1"
                : colorPalette.stormGrey
              : "white"
          }
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
              <Box direction={"column"} pad={{ right: "medium" }}>
                {guideCategory && (
                  <MobileOnly>
                    <StyledMobileCategory>{guideCategory}</StyledMobileCategory>
                  </MobileOnly>
                )}
                <Paragraph
                  style={{ fontWeight: 500 }}
                  color={isSmall ? colorPalette.dark_blue : colorPalette.grey}
                  size={size !== "small" ? "medium" : "small"}
                >
                  {title}
                </Paragraph>
              </Box>
              {size !== "small" && !isSmall && guideCategory && (
                <Box align={"start"} justify={"center"}>
                  <dl>
                    <dt>
                      <Paragraph size={"xsmall"} color={colorPalette.grey}>
                        {getDictionaryValue("Guide Type")}
                      </Paragraph>
                    </dt>
                    <dd>
                      <StyledParagraph size={"small"} color={colorPalette.grey}>
                        {guideCategory}
                      </StyledParagraph>
                    </dd>
                  </dl>
                </Box>
              )}
              <Box direction={"row"} align={"center"} justify={"end"}>
                {downloadLink && (
                  <Button
                    color={colorPalette.green}
                    size={ButtonSizes.small}
                    link={downloadLink}
                    icon={<DownloadIcon url={downloadLink.url} />}
                  />
                )}
                {pageLink && (
                  <Button
                    primary
                    color={colorPalette.blue}
                    size={ButtonSizes.small}
                    label={"View"}
                    link={pageLink}
                    margin={{ left: "small" }}
                  />
                )}
              </Box>
            </React.Fragment>
          </StyledResponsiveGrid>
        </Card>
      )}
    </ResponsiveContext.Consumer>
  );
};

const StyledMobileCategory = styled(Paragraph)`
  font-size: 12px;
  font-weight: ${fontWeights.bold};
  color: ${colorPalette.grey};
  opacity: 0.6;
`;

const StyledResponsiveGrid = styled(ResponsiveGrid)`
  width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${fontWeights.bold};
`;

export default GuideCard;
