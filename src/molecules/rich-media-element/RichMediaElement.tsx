import Image, { ImageProps } from "next/image";
import React, { ReactText } from "react";
import styled from "styled-components";

interface RichMediaElementProps
  extends Omit<ImageProps, "alt" | "layout" | "src"> {
  alt?: string;
  url?: string;
  layout: "fill" | "responsive" | "intrinsic" | "fixed";
  dimensions?: { height: number; width: number };
}

const RichMediaElement: React.FC<RichMediaElementProps> = ({
  url,
  alt = "",
  dimensions,
  layout,
  ...restProps
}) => {
  if (layout === "fill") {
    return (
      <StyledImage
        {...restProps}
        src={url || ""}
        alt={alt || ""}
        objectFit="cover"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        layout={layout}
      />
    );
  }

  return (
    <StyledImage
      {...restProps}
      src={url || ""}
      alt={alt || ""}
      objectFit="cover"
      width={dimensions?.width as ReactText}
      height={dimensions?.height as ReactText}
    />
  );
};

const StyledImage = styled(Image)`
  border-radius: 24px;
  height: 100%;

  @media only screen and (max-width: 600px) {
    border-radius: 12px;
  }
`;

export default RichMediaElement;
