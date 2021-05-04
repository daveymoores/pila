import { ResponsiveContext } from "grommet";
import Image, { ImageProps } from "next/image";
import React, { ReactText, useContext } from "react";
import styled from "styled-components";

import PrismicImageProps from "../../../types/ImageProps";

interface RichMediaElementProps
  extends Omit<ImageProps, "alt" | "layout" | "src"> {
  alt?: string;
  url?: string;
  layout: "fill" | "responsive" | "intrinsic" | "fixed";
  dimensions?: { height: number; width: number };
  mobile?: PrismicImageProps;
}

const RichMediaElement: React.FC<RichMediaElementProps> = ({
  url,
  alt = "",
  dimensions,
  layout,
  mobile,
  className,
  ...restProps
}) => {
  if (!url) return null;

  const size = useContext(ResponsiveContext);
  const shouldRenderMobileImage =
    size === "mobile" && mobile && "dimensions" in mobile;

  const props = {
    alt: shouldRenderMobileImage ? mobile?.alt : alt,
    src: shouldRenderMobileImage ? mobile?.url : url,
    height: shouldRenderMobileImage
      ? mobile?.dimensions?.height
      : dimensions?.height,
    width: shouldRenderMobileImage
      ? mobile?.dimensions?.width
      : dimensions?.width,
  };

  if (layout === "fill") {
    return (
      <StyledImage
        {...restProps}
        src={props.src || ""}
        alt={props.alt || ""}
        objectFit="cover"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        layout={layout}
        className={className}
        unoptimized
      />
    );
  }

  return (
    <StyledImage
      {...restProps}
      src={url || ""}
      alt={alt || ""}
      objectFit="cover"
      width={props.width as ReactText}
      height={props.height as ReactText}
      className={className}
      unoptimized
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
