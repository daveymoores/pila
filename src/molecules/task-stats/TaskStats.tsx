import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

import DictionaryContext from "../../context/DictionaryContext";
import { fontWeights } from "../../theme/pila";

interface TaskStatsProps {
  length: number;
  difficulty: string;
  age: string;
}

const TaskStats: React.FC<TaskStatsProps> = ({ length, difficulty, age }) => {
  const { getDictionaryValue } = React.useContext(DictionaryContext);
  return (
    <Box as="dl" justify={"start"} align={"center"} direction={"row"}>
      <StyledDt>{getDictionaryValue("Length")}:</StyledDt>
      <StyledDd>
        {length} {getDictionaryValue("minutes")}
      </StyledDd>
      <StyledDt>{getDictionaryValue("Difficulty")}:</StyledDt>
      <StyledDd>{difficulty}</StyledDd>
      <StyledDt>{getDictionaryValue("Age")}:</StyledDt>
      <StyledDd>{age}</StyledDd>
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

export default TaskStats;
