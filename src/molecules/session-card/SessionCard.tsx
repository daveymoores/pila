import { Box, Card, Paragraph, ResponsiveContext } from "grommet";
import { Link } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import ResponsiveGrid from "../../organisms/responsive-grid/ResponsiveGrid";
import { colorPalette, fontWeights } from "../../theme/pila";

export enum CardVariant {
  SMALL = "small",
  LARGE = "large",
}

interface GuideCardProps {
  title: string;
  dashboardLink: Link;
  moduleLink: Link;
  variant?: CardVariant;
  className?: string;
}

const SessionCard: React.FC<GuideCardProps> = ({
  title,
  dashboardLink,
  moduleLink,
  className,
}) => {
  const columns = {
    small: ["flex", "flex"],
    medium: ["flex", "flex"],
    large: ["flex", "flex"],
    xlarge: ["flex", "flex"],
  };

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Card
          width={"100%"}
          elevation={"none"}
          pad={"small"}
          background={"white"}
          direction={"row"}
          align={"center"}
          justify={"between"}
          margin={{ bottom: "medium" }}
          className={className}
        >
          <StyledResponsiveGrid
            align={"center"}
            gap={"none"}
            rows={"1"}
            columns={columns}
            pad={{ left: "small" }}
          >
            <React.Fragment>
              <Box direction={"row"} align={"center"} justify={"between"}>
                <Paragraph
                  style={{ fontWeight: 500 }}
                  color={colorPalette.dark_blue}
                  size={"small"}
                >
                  {title}
                </Paragraph>
                <dl>
                  <dt>
                    <Paragraph size={"xsmall"} color={colorPalette.grey}>
                      Participants
                    </Paragraph>
                  </dt>
                  <dd>
                    <StyledParagraph size={"xsmall"} color={colorPalette.grey}>
                      16
                    </StyledParagraph>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <Paragraph size={"xsmall"} color={colorPalette.grey}>
                      Date
                    </Paragraph>
                  </dt>
                  <dd>
                    <StyledParagraph size={"xsmall"} color={colorPalette.grey}>
                      22/06/21
                    </StyledParagraph>
                  </dd>
                </dl>
              </Box>

              <Box direction={"row"} align={"center"} justify={"end"}>
                <Button
                  color={colorPalette.green}
                  size={ButtonSizes.small}
                  label={"session dashboard"}
                  link={dashboardLink}
                />
                <Button
                  primary
                  color={colorPalette.blue}
                  size={ButtonSizes.small}
                  label={"view module"}
                  link={moduleLink}
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
  font-weight: ${fontWeights.bold};
`;

export default SessionCard;
