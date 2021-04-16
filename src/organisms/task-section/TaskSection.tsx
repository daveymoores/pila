import { Box, Card, Heading, Image, Paragraph } from "grommet";
import { RichText } from "prismic-reactjs";
import React, { SyntheticEvent } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

import {
  AssessmentApplicationMainProps,
  Task,
} from "../../../pages/learning-modules/[learning_module]/[assessment_application]";
import PageData from "../../../types/PageData";
import PageType from "../../../types/PageTypes";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Category from "../../atoms/category/Category";
import Section from "../../layout/section/Section";
import TaskStats from "../../molecules/task-stats/TaskStats";
import { colorPalette } from "../../theme/pila";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

const columns = {
  small: ["auto"],
  medium: ["auto"],
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
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

type TaskSection = Pick<
  PageData<Task, AssessmentApplicationMainProps>,
  "slices"
>;

const TaskSection: React.FC<TaskSection> = ({ slices }) => {
  const [selectedTaskData, setSelectedTaskData] = React.useState<Task>();
  const [loading, setLoading] = React.useState<boolean>();

  React.useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setSelectedTaskData(slices[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleClick = React.useCallback(
    (event: SyntheticEvent, cardIndex: number) => {
      event.preventDefault();
      setLoading(true);

      setTimeout(() => {
        setSelectedTaskData(slices[cardIndex]);
        setLoading(false);
      }, 2000);
    },
    [selectedTaskData, slices]
  );

  return (
    <Section>
      <Box justify={"center"} margin={{ top: "xlarge", bottom: "xlarge" }}>
        <ResponsiveGrid
          columns={columns}
          areas={gridAreas}
          rows={rows}
          align={"start"}
        >
          <Box gridArea="text" align={"stretch"}>
            <Heading size={"24px"} margin={{ bottom: "medium" }}>
              Tasks
            </Heading>

            {slices &&
              slices.map(({ primary }, index) => {
                if (!primary) return null;

                const {
                  taskLength,
                  taskDifficulty,
                  maximumAge,
                  minimumAge,
                  taskTitle,
                } = primary;

                const isSelected =
                  RichText.asText(taskTitle) ===
                  (selectedTaskData?.primary?.taskTitle &&
                    RichText.asText(selectedTaskData?.primary?.taskTitle));

                return (
                  <StyledCard
                    key={index}
                    pad={"medium"}
                    elevation={"none"}
                    background={isSelected ? "light-1" : "none"}
                    margin={{ bottom: "medium" }}
                    onClick={(event: SyntheticEvent) =>
                      handleClick(event, index)
                    }
                  >
                    {isSelected && <ActiveIcon />}
                    <Heading
                      level={3}
                      size={"21px"}
                      margin={{ bottom: "small" }}
                    >
                      {RichText.asText(taskTitle)}
                    </Heading>
                    <TaskStats
                      length={taskLength}
                      difficulty={taskDifficulty}
                      age={`${minimumAge} - ${maximumAge}`}
                    />
                  </StyledCard>
                );
              })}
          </Box>
          <ImageBox
            gridArea="image"
            margin={{ top: "large" }}
            justify={"stretch"}
          >
            <StyledLoader
              visible={loading}
              type="TailSpin"
              color={colorPalette.green}
              height={40}
              width={40}
            />
            {!loading && (
              <React.Fragment>
                {selectedTaskData?.primary?.taskTitle && (
                  <Heading
                    textAlign={"start"}
                    level={"1"}
                    alignSelf={"stretch"}
                    size="small"
                    responsive={false}
                    margin={{ top: "medium", bottom: "medium" }}
                  >
                    {RichText.asText(selectedTaskData.primary.taskTitle)}
                  </Heading>
                )}
                <Box direction={"row"} justify={"start"} align={"end"}>
                  {(selectedTaskData?.items || []).map(
                    ({ categories }, index) => {
                      return (
                        <Category key={index} name={categories?.data?.name} />
                      );
                    }
                  )}
                  <Button
                    primary
                    margin={{ left: "auto" }}
                    size={ButtonSizes.small}
                    color={colorPalette.blue}
                    label={"Start task"}
                    link={{
                      type: PageType.SESSION,
                    }}
                  />
                </Box>
                {selectedTaskData?.primary?.taskImage && (
                  <Box
                    margin={{ top: "medium" }}
                    gridArea="image"
                    round={"medium"}
                    overflow={"hidden"}
                  >
                    <Image
                      src={selectedTaskData.primary.taskImage?.url}
                      width={"100%"}
                    />
                  </Box>
                )}
                {selectedTaskData?.primary?.taskBody && (
                  <Paragraph size={"small"} margin={{ top: "large" }}>
                    {RichText.asText(selectedTaskData.primary.taskBody)}
                  </Paragraph>
                )}
              </React.Fragment>
            )}
          </ImageBox>
        </ResponsiveGrid>
      </Box>
    </Section>
  );
};

const StyledLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
`;

const ImageBox = styled(Box)`
  position: relative;
`;

const ActiveIcon = styled(Box)`
  height: 20px;
  width: 20px;
  background-color: ${colorPalette.grey_blue};
  border-radius: 50%;
  position: absolute;
  right: 20px;
  top: 20px;
`;

const StyledCard = styled(Card)`
  position: relative;
`;

export default TaskSection;
