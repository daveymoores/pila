import { ResponsiveContext } from "grommet";
import Image, { ImageProps } from "next/image";
import { Link } from "prismic-reactjs";
import React, { useContext } from "react";
import ReactPlayer from "react-player/lazy";
import styled from "styled-components";

import PrismicImageProps from "../../../types/ImageProps";

interface RichMediaElementProps
  extends Omit<ImageProps, "alt" | "layout" | "src"> {
  video?: Link;
  alt?: string | null;
  url?: string;
  layout: "fill" | "responsive" | "intrinsic" | "fixed";
  dimensions?: { height: number; width: number };
  mobile?: PrismicImageProps;
}

const RichMediaElement: React.FC<RichMediaElementProps> = ({
  video,
  url,
  alt = "",
  dimensions,
  layout,
  mobile,
  className,
  ...restProps
}) => {
  if (video && video.url) {
    return (
      <ResponsiveWrapper>
        <ReactPlayer
          className="react-player"
          url={video.url}
          width="100%"
          height="100%"
        />
      </ResponsiveWrapper>
    );
  }

  if (!url) return null;

  const size = useContext(ResponsiveContext);
  const shouldRenderMobileImage =
    size === "small" && mobile && "dimensions" in mobile;

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
      width={props.width}
      height={props.height}
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

const ResponsiveWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;

  > .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default RichMediaElement;
