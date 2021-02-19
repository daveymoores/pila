import { Card, CardBody, CardHeader, Heading, Image, Paragraph } from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import { colorPalette } from "../../theme/pila";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Icon from "./Icon";

interface ProjectCardProps {
  src: string;
  title: RichTextBlock[];
  body: RichTextBlock[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ src, title, body }) => {
  /* TODO - move "View Module" to dictionary */
  return (
    <Card
      background={"white"}
      elevation="xlarge"
      pad="large"
      round={"medium"}
      direction={"column"}
    >
      <CardHeader justify={"center"}>
        {src ? <Image src={src} width={"100%"} /> : <Icon />}
      </CardHeader>
      <CardBody
        margin={{ top: "medium" }}
        pad={{
          top: "medium",
        }}
        align={"start"}
      >
        <Heading
          level={"4"}
          margin="none"
          alignSelf={"stretch"}
          responsive={false}
        >
          {RichText.asText(title)}
        </Heading>
        <Paragraph
          margin={{
            top: "medium",
          }}
          fill
        >
          {RichText.asText(body)}
        </Paragraph>
        <Button
          margin={{ top: "medium" }}
          primary
          color={colorPalette.green}
          size={ButtonSizes.small}
          type="button"
          label="View module"
        />
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
