import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

import { AssessmentApplicationMainProps } from "../../../pages/learning-modules/[learning_module]/[assessment_application]";
import DictionaryContext from "../../context/DictionaryContext";
import { fontWeights } from "../../theme/pila";

type ApplicationStats = Pick<
  AssessmentApplicationMainProps,
  "applicationsStats"
>;

//TODO - add dictionary for reused labels
const ApplicationStats: React.FC<ApplicationStats> = ({
  applicationsStats,
}) => {
  const { getDictionaryValue } = React.useContext(DictionaryContext);
  return (
    <Box as="dl" justify={"start"} align={"center"} direction={"row"}>
      <StyledDt>{getDictionaryValue("Units")}:</StyledDt>
      <StyledDd>{applicationsStats?.units}</StyledDd>
      <StyledDt>{getDictionaryValue("Difficulty")}:</StyledDt>
      <StyledDd>{applicationsStats?.difficulty}</StyledDd>
      <StyledDt>{getDictionaryValue("Age")}:</StyledDt>
      <StyledDd>{applicationsStats?.age}</StyledDd>
    </Box>
  );
};

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
