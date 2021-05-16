import { Box, Card, Paragraph, ResponsiveContext } from "grommet";
import { Link } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import getFileExtension from "../../../helpers/get-file-extension/getFileExtension";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import DownloadIcon from "../../atoms/download-icon/DownloadIcon";
import ResponsiveGrid from "../../organisms/responsive-grid/ResponsiveGrid";
import { colorPalette, fontWeights } from "../../theme/pila";

export enum CardVariant {
  SMALL = "small",
  LARGE = "large",
}

interface GuideCardProps {
  title?: string;
  downloadLink?: Link;
  pageLink?: Link;
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
        small: ["flex", "auto"],
        medium: ["flex", "auto"],
        large: ["flex", "auto"],
        xlarge: ["flex", "auto"],
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
          pad={isSmall ? "small" : size === "large" ? "medium" : "small"}
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
                style={{ fontWeight: 500 }}
                color={isSmall ? colorPalette.dark_blue : colorPalette.grey}
                size={size !== "small" ? "medium" : "small"}
              >
                {title}
              </Paragraph>
              {size !== "small" && !isSmall && downloadLink?.url && (
                <Box align={"center"} justify={"center"}>
                  <dl>
                    <dt>
                      <Paragraph size={"small"} color={colorPalette.grey}>
                        Format
                      </Paragraph>
                    </dt>
                    <dd>
                      <StyledParagraph size={"small"} color={colorPalette.grey}>
                        {getFileExtension(downloadLink.url)}
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

const StyledResponsiveGrid = styled(ResponsiveGrid)`
  width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${fontWeights.bold};
`;

export default GuideCard;
