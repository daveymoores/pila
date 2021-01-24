import "antd/dist/antd.css";

import { Button } from "antd";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React, { FC } from "react";

interface FullWidthImageProps {
  slice: {
    primary: {
      title: RichTextBlock[];
      description: RichTextBlock[];
      button: Link;
      image: string;
      textPosition: string;
    };
  };
}

const FullWidthImage: FC<FullWidthImageProps> = ({ slice }) => (
  <section>
    {slice.primary.title && <RichText render={slice.primary.title} />}
    {slice.primary.description && (
      <RichText render={slice.primary.description} />
    )}
    {slice.primary.button && <Button type="primary">Button</Button>}
  </section>
);

export default FullWidthImage;
