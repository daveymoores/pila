import { motion } from "framer-motion";
import { Box, Card, Grid, Paragraph } from "grommet";
import { Book, Dashboard, Group } from "grommet-icons";
import { Link } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import {
  DesktopUp,
  MobileOnly,
  TabletOnly,
  TabletUp,
} from "../../atoms/responsive-helpers/ResponsiveHelpers";
import ResponsiveGrid from "../../organisms/responsive-grid/ResponsiveGrid";
import { colorPalette, fontWeights } from "../../theme/pila";

export enum CardVariant {
  SMALL = "small",
  LARGE = "large",
}

interface GuideCardProps {
  title: string;
  date?: string;
  participants?: number;
  dashboardLink: Link;
  moduleLink: Link;
  variant?: CardVariant;
  className?: string;
}

const SessionCard: React.FC<GuideCardProps> = ({
  title,
  date,
  participants,
  dashboardLink,
  moduleLink,
  className,
}) => {
  const columns = {
    small: ["flex", "flex"],
    medium: ["flex", "flex"],
    large: ["2/3", "1/3"],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
            <Grid
              columns={["2/3", "1/3"]}
              rows={["auto"]}
              gap={"none"}
              align={"center"}
            >
              <Box pad={{ right: "large" }}>
                <Paragraph
                  style={{ fontWeight: 500 }}
                  color={colorPalette.dark_blue}
                  size={"small"}
                >
                  {title}
                </Paragraph>
              </Box>
              <Box direction={"row"} align={"center"}>
                <TabletUp>
                  <StyledParticipantList>
                    <dt>
                      <TabletOnly>
                        <Group size={"20px"} />
                      </TabletOnly>
                      <DesktopUp>
                        <Paragraph size={"xsmall"} color={colorPalette.grey}>
                          Participants
                        </Paragraph>
                      </DesktopUp>
                    </dt>
                    <dd>
                      <StyledParagraph
                        size={"xsmall"}
                        color={colorPalette.grey}
                      >
                        {participants}
                      </StyledParagraph>
                    </dd>
                  </StyledParticipantList>
                </TabletUp>

                <dl>
                  <dt>
                    <Paragraph size={"xsmall"} color={colorPalette.grey}>
                      Date
                    </Paragraph>
                  </dt>
                  <dd>
                    <StyledParagraph size={"xsmall"} color={colorPalette.grey}>
                      {date}
                    </StyledParagraph>
                  </dd>
                </dl>
              </Box>
            </Grid>

            <Box direction={"row"} align={"center"} justify={"end"}>
              <MobileOnly style={{ width: "auto" }}>
                <Button
                  color={colorPalette.green}
                  size={ButtonSizes.small}
                  link={dashboardLink}
                  icon={<Dashboard color={colorPalette.white} />}
                />
              </MobileOnly>
              <TabletUp style={{ width: "auto" }}>
                <Button
                  color={colorPalette.green}
                  size={ButtonSizes.small}
                  label={"dashboard"}
                  link={dashboardLink}
                />
              </TabletUp>
              <MobileOnly style={{ width: "auto" }}>
                <Button
                  primary
                  color={colorPalette.blue}
                  size={ButtonSizes.small}
                  icon={<Book color={colorPalette.white} />}
                  link={moduleLink}
                  margin={{ left: "small" }}
                />
              </MobileOnly>
              <TabletUp style={{ width: "auto" }}>
                <Button
                  primary
                  color={colorPalette.blue}
                  size={ButtonSizes.small}
                  label={"module"}
                  link={moduleLink}
                  margin={{ left: "small" }}
                />
              </TabletUp>
            </Box>
          </React.Fragment>
        </StyledResponsiveGrid>
      </Card>
    </motion.div>
  );
};

const StyledResponsiveGrid = styled(ResponsiveGrid)`
  width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${fontWeights.bold};
`;

const StyledParticipantList = styled.dl`
  max-width: 40px;
`;

export default SessionCard;
