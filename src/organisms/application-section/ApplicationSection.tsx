import { Box, Heading, Image, Paragraph } from "grommet";
import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import { AssessmentApplicationMainProps } from "../../../pages/learning-modules/[learning_module]/[assessment_application]";
import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import ApplicationStats from "../../molecules/application-stats/ApplicationStats";
import GuideCard, { CardVariant } from "../../molecules/guide-card/GuideCard";
import { colorPalette } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: [
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
  ],
  xlarge: [
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
    "flex",
  ],
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const gridAreas = {
  small: [
    { name: "image", start: [0, 0], end: [1, 0] },
    { name: "text", start: [0, 1], end: [1, 1] },
  ],
  medium: [
    { name: "image", start: [0, 0], end: [1, 0] },
    { name: "text", start: [0, 1], end: [1, 1] },
  ],
  large: [
    { name: "image", start: [6, 0], end: [11, 0] },
    { name: "text", start: [0, 0], end: [4, 0] },
  ],
  xlarge: [
    { name: "image", start: [6, 0], end: [11, 0] },
    { name: "text", start: [0, 0], end: [4, 0] },
  ],
};

interface ApplicationSectionProps
  extends Omit<AssessmentApplicationMainProps, "body" | "applicationLink"> {
  index: number;
}

const ApplicationSection: React.FC<ApplicationSectionProps> = ({
  uid,
  title,
  applicationsStats,
  shortBody,
  video,
  image,
  downloadLinks,
  index,
}) => {
  return (
    <Box
      justify={"center"}
      margin={{ top: "xlarge", bottom: index ? "large" : "none" }}
    >
      <ResponsiveGrid
        columns={columns}
        areas={gridAreas}
        rows={rows}
        align={"start"}
      >
        <Box gridArea="image" round={"medium"} overflow={"hidden"}>
          <Image src={image?.url} />
        </Box>

        <Box gridArea="text" justify={"start"} align={"start"}>
          <StyledHeading size={"small"}>{RichText.asText(title)}</StyledHeading>
          <Box margin={{ top: "medium", bottom: "large" }}>
            <ApplicationStats applicationsStats={applicationsStats} />
          </Box>
          <Paragraph margin={{ bottom: "large" }} size={"small"}>
            {RichText.asText(shortBody)}
          </Paragraph>
          {downloadLinks &&
            downloadLinks.map(({ label, link, downloadLink }, index) => (
              <GuideCard
                key={index}
                title={label}
                downloadLink={downloadLink}
                pageLink={link}
                variant={CardVariant.SMALL}
              />
            ))}
          <Button
            primary
            margin={{ top: "large" }}
            size={ButtonSizes.large}
            color={colorPalette.blue}
            label={"View application"}
            link={{
              type: PageType.ASSESSMENT_APPLICATION,
              uid,
            }}
          />
        </Box>
      </ResponsiveGrid>
    </Box>
  );
};

const StyledHeading = styled(Heading)`
  font-size: 28px;
`;

export default ApplicationSection;
