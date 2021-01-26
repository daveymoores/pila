import "antd/dist/antd.css";

import styled from "@emotion/styled";
import { Button, Card, Col, Row } from "antd";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";

import ImageProps from "../../types/ImageProps";

interface FullWidthImageProps {
  slice: {
    primary: {
      title: RichTextBlock[];
      description: RichTextBlock[];
      button: Link;
      image: ImageProps;
      textPosition: string;
    };
  };
}

const FullWidthImage: FC<FullWidthImageProps> = ({ slice }) => (
  <StyledSection bgUrl={slice.primary.image.url}>
    <StyledRow align={"middle"}>
      <Col span={24}>
        <Row>
          <Col span={8}>
            <Card>
              {slice.primary.title && <RichText render={slice.primary.title} />}
              {slice.primary.description && (
                <RichText render={slice.primary.description} />
              )}
              {slice.primary.button && <Button type="primary">Button</Button>}
            </Card>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  </StyledSection>
);

type StyledSectionProps = {
  bgUrl?: string;
};

const StyledRow = styled(Row)`
  max-width: 1120px;
  min-height: 800px;
`;

const StyledSection = styled.section<StyledSectionProps>`
  background-image: ${(props) => `url("${props.bgUrl}")`};
`;

export default FullWidthImage;
