import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Paragraph,
} from "grommet";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import Button, { ButtonSizes } from "../../atoms/button/Button";
import { colorPalette } from "../../theme/pila";

interface ProjectCardProps {
  src: string;
  title: RichTextBlock[];
  body: RichTextBlock[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ src, title, body }) => {
  /* TODO - move "View Module" to dictionary */
  return (
    <Card elevation="xlarge" pad="medium">
      <CardHeader>
        <Image src={src} width={"100%"} />
      </CardHeader>
      <CardBody
        pad={{
          top: "medium",
        }}
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
      </CardBody>
      <CardFooter
        pad={{
          top: "medium",
        }}
      >
        <Button
          primary
          color={colorPalette.blue}
          size={ButtonSizes.small}
          type="button"
          label="View module"
        />
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
