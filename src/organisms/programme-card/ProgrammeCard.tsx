import { Card, CardBody, CardHeader, Heading, Image, Paragraph } from "grommet";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import ImageProps from "../../../types/ImageProps";
import Button, { ButtonSizes } from "../../atoms/button/Button";
import { colorPalette } from "../../theme/pila";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Icon from "./Icon";

interface ProgrammeCardProps {
  image?: ImageProps;
  link?: Link;
  title?: RichTextBlock[];
  body?: RichTextBlock[];
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({
  image,
  link,
  title,
  body,
}) => {
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
        {image ? <Image {...image} alt={""} width={"100%"} /> : <Icon />}
      </CardHeader>
      <CardBody
        margin={{ top: "medium" }}
        pad={{
          top: "medium",
        }}
        align={"start"}
      >
        {title && (
          <Heading
            level={"4"}
            margin="none"
            alignSelf={"stretch"}
            responsive={false}
          >
            {RichText.asText(title)}
          </Heading>
        )}
        {body && (
          <Paragraph
            margin={{
              top: "medium",
            }}
            fill
          >
            {RichText.asText(body)}
          </Paragraph>
        )}
        {link && (
          <Button
            margin={{ top: "medium" }}
            primary
            color={colorPalette.green}
            size={ButtonSizes.small}
            type="button"
            label="View module"
            link={link}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default ProgrammeCard;
