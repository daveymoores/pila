import { ResponsiveContext } from "grommet";
import dynamic from "next/dynamic";
import Image, { type ImageProps } from "next/image";
import React, { useContext } from "react";
import styled from "styled-components";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

import type { Link } from "../../../lib/prismic-types";
import PrismicImageProps from "../../../types/ImageProps";

type ImageLayout = "fill" | "responsive" | "intrinsic" | "fixed";

interface RichMediaElementProps extends Omit<
  ImageProps,
  "alt" | "src" | "fill"
> {
  video?: Link;
  alt?: string | null;
  url?: string;
  layout: ImageLayout;
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
  const size = useContext(ResponsiveContext);

  if (video && "url" in video && video.url) {
    return (
      <ResponsiveWrapper>
        <ReactPlayer
          className="react-player"
          src={video.url}
          width="100%"
          height="100%"
        />
      </ResponsiveWrapper>
    );
  }

  if (!url) return null;

  const shouldRenderMobileImage =
    size === "small" && mobile && "dimensions" in mobile;

  const imageSrc = shouldRenderMobileImage ? mobile?.url : url;
  const imageAlt = shouldRenderMobileImage ? mobile?.alt : alt;
  const imageWidth = shouldRenderMobileImage
    ? mobile?.dimensions?.width
    : dimensions?.width;
  const imageHeight = shouldRenderMobileImage
    ? mobile?.dimensions?.height
    : dimensions?.height;

  if (layout === "fill") {
    return (
      <FillContainer className={className}>
        <StyledImage
          {...restProps}
          src={imageSrc || ""}
          alt={imageAlt || ""}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </FillContainer>
    );
  }

  const width = imageWidth || 800;
  const height = imageHeight || 600;
  const isResponsive = layout === "responsive" || layout === "intrinsic";

  return (
    <StyledImage
      {...restProps}
      src={imageSrc || ""}
      alt={imageAlt || ""}
      width={width}
      height={height}
      sizes={isResponsive ? "(max-width: 600px) 100vw, 800px" : undefined}
      style={{
        objectFit: "cover",
        width: isResponsive ? "100%" : width,
        height: isResponsive ? "auto" : height,
      }}
      className={className}
      unoptimized
    />
  );
};

const FillContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled(Image)`
  border-radius: 24px;

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
