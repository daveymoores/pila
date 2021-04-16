import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

import { AssessmentApplicationMainProps } from "../../../pages/learning-modules/[learning_module]/[assessment_application]";
import { fontWeights } from "../../theme/pila";

type ApplicationStats = Pick<
  AssessmentApplicationMainProps,
  "applicationsStats"
>;

//TODO - add dictionary for reused labels
const ApplicationStats: React.FC<ApplicationStats> = ({
  applicationsStats,
}) => (
  <Box as="dl" justify={"start"} align={"center"} direction={"row"}>
    <StyledDt>Units:</StyledDt>
    <StyledDd>{applicationsStats.units}</StyledDd>
    <StyledDt>Difficulty:</StyledDt>
    <StyledDd>{applicationsStats.difficulty}</StyledDd>
    <StyledDt>Age:</StyledDt>
    <StyledDd>{applicationsStats.age}</StyledDd>
  </Box>
);

const StyledDt = styled.dt`
  font-size: 16px;
  font-weight: ${fontWeights.bold};
  margin-right: 5px;
`;

const StyledDd = styled.dd`
  font-size: 16px;
  margin-right: 20px;
  white-space: nowrap;
`;

export default ApplicationStats;
