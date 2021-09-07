import { Box, Card, Heading } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";

import {
  AssessmentApplicationMainProps,
  Task,
} from "../../../pages/learning-modules/[learning_module]/[assessment_application]";
import PageData from "../../../types/PageData";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import Category from "../../atoms/category/Category";
import Section from "../../layout/section/Section";
import RichMediaElement from "../../molecules/rich-media-element/RichMediaElement";
import RichTextParser from "../../molecules/rich-text-parser/RichTextParser";
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

interface Slices
  extends Pick<PageData<Task, AssessmentApplicationMainProps>, "slices"> {
  taskSectionTitle?: RichTextBlock[];
  taskSectionIntroduction?: RichTextBlock[];
}

type TaskSectionData = Pick<
  Slices,
  "taskSectionTitle" | "taskSectionIntroduction"
>;

type TaskSection = TaskSectionData & Slices;

const TaskSection: React.FC<TaskSection> = ({
  slices,
  taskSectionTitle,
  taskSectionIntroduction,
}) => {
  const [selectedTaskData, setSelectedTaskData] = React.useState<Task>();

  React.useEffect(() => {
    setSelectedTaskData(slices[0]);
  }, []);

  const handleClick = React.useCallback(
    (event: SyntheticEvent, cardIndex: number) => {
      event.preventDefault();
      setSelectedTaskData(slices[cardIndex]);
    },
    [selectedTaskData, slices]
  );

  return (
    <Section>
      <Box justify={"center"} margin={{ bottom: "xlarge" }}>
        {taskSectionTitle && (
          <Heading size={"small"} margin={{ bottom: "large" }}>
            {RichText.asText(taskSectionTitle)}
          </Heading>
        )}
        {!!taskSectionIntroduction?.length && (
          <Box margin={{ bottom: "small" }} width={{ max: "850px" }}>
            <RichTextParser body={taskSectionIntroduction} />
          </Box>
        )}
        <ResponsiveGrid
          columns={columns}
          areas={gridAreas}
          rows={rows}
          align={"start"}
        >
          <Box gridArea="text" align={"stretch"} margin={{ top: "large" }}>
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
                      !isSelected && handleClick(event, index)
                    }
                    style={{ cursor: isSelected ? "default" : "pointer" }}
                  >
                    {slices.length > 1 && isSelected && <ActiveIcon />}
                    <Heading
                      level={3}
                      size={"21px"}
                      margin={{ bottom: "small" }}
                    >
                      {RichText.asText(taskTitle)}
                    </Heading>
                    {taskLength && taskDifficulty && (
                      <TaskStats
                        length={taskLength}
                        difficulty={taskDifficulty}
                        age={`${minimumAge} - ${maximumAge}`}
                      />
                    )}
                  </StyledCard>
                );
              })}
          </Box>
          <ImageBox gridArea="image" justify={"stretch"}>
            {selectedTaskData?.primary?.taskTitle && (
              <Heading
                textAlign={"start"}
                level={"3"}
                alignSelf={"stretch"}
                size="medium"
                responsive={false}
                margin={{ top: "large", bottom: "medium" }}
              >
                {RichText.asText(selectedTaskData.primary.taskTitle)}
              </Heading>
            )}
            <Box direction={"row"} justify={"start"} align={"end"}>
              {(selectedTaskData?.items || []).map(({ categories }, index) => {
                if (!categories?.data?.name) return;
                return <Category key={index} name={categories?.data?.name} />;
              })}
              {selectedTaskData?.primary.taskLink.url && (
                <Button
                  primary
                  margin={{ left: "auto" }}
                  size={ButtonSizes.small}
                  color={colorPalette.blue}
                  label={"Start task"}
                  link={selectedTaskData?.primary.taskLink}
                />
              )}
            </Box>
            {selectedTaskData?.primary?.taskImage && (
              <Box
                margin={{ top: "medium" }}
                gridArea="image"
                round={"medium"}
                overflow={"hidden"}
              >
                <RichMediaElement
                  {...selectedTaskData.primary.taskImage}
                  video={selectedTaskData.primary.taskVideo}
                  alt={selectedTaskData.primary.taskImage?.alt || ""}
                  layout={"responsive"}
                />
              </Box>
            )}
            {selectedTaskData?.primary?.taskBody && (
              <Box margin={{ top: "large" }}>
                <RichTextParser body={selectedTaskData.primary.taskBody} />
              </Box>
            )}
          </ImageBox>
        </ResponsiveGrid>
      </Box>
    </Section>
  );
};

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
