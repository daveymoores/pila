import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

import RichMediaElement from "../../molecules/rich-media-element/RichMediaElement";
import { ModuleHeroProps } from "../../organisms/module-hero/ModuleHero";

const LearningModuleIcon: React.FC<Pick<ModuleHeroProps, "icon">> = ({
  icon,
}) => (
  <Box justify={"center"} style={{ position: "relative" }} height={"8em"}>
    {icon && (
      <StyledRichMediaElement {...icon} alt={icon?.alt || ""} layout={"fill"} />
    )}
  </Box>
);

const StyledRichMediaElement = styled(RichMediaElement)`
  object-fit: contain !important;
  max-width: 200px;
`;

export default LearningModuleIcon;
