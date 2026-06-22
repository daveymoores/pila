import { Anchor, AnchorProps, Box } from "grommet";
import NextLink from "next/link";
import React from "react";
import styled from "styled-components";

import type { Link } from "../../../lib/prismic-types";
import { getLinkUrl } from "../../../lib/prismic-types";
import { resolveLinkSync } from "../../../prismicio";
import { colorPalette, fontWeights } from "../../theme/pila";
import useWebMedia from "../../hooks/useWebMedia";

interface CustomLinkProps extends AnchorProps {
  label: string;
  link: Link;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface InternalLinkStyleProps {
  $color?: string;
  $weight?: string | number;
  $size?: string;
}

const resolveLinkColor = (color?: string) => {
  if (color === "white") {
    return colorPalette.white;
  }

  if (color === "brand") {
    return colorPalette.blue;
  }

  return color;
};

const resolveLinkWeight = (weight?: string | number) => {
  if (weight === "normal") {
    return fontWeights.normal;
  }

  if (weight === "bold") {
    return fontWeights.bold;
  }

  return weight;
};

const StyledInternalLink = styled(NextLink)<InternalLinkStyleProps>`
  color: ${({ $color }) => resolveLinkColor($color) || "inherit"};
  font-weight: ${({ $weight }) => resolveLinkWeight($weight) || "inherit"};
  font-size: ${({ $size }) => ($size === "small" ? "14px" : "inherit")};
  text-decoration: none;

  &:hover {
    color: ${({ $color }) => resolveLinkColor($color) || "inherit"};
    text-decoration: underline;
  }
`;

export const TextLink: React.FC<CustomLinkProps> = ({
  label,
  link,
  onClick,
  className,
  style,
  margin,
  color,
  weight,
  size,
  ...rest
}) => {
  const handleClick = useWebMedia(link);

  if (onClick) {
    return (
      <Anchor
        label={label}
        onClick={onClick}
        className={className}
        style={style}
        margin={margin}
        color={color}
        weight={weight}
        size={size}
        {...rest}
      />
    );
  }

  if (link.link_type === "Media" || link.link_type === "Web") {
    const href = getLinkUrl(link);
    const target =
      "target" in link && link.target ? String(link.target) : undefined;

    return (
      <Anchor
        label={label}
        href={href}
        target={target}
        rel={target ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className={className}
        style={style}
        margin={margin}
        color={color}
        weight={weight}
        size={size}
        {...rest}
      />
    );
  }

  return (
    <Box
      as="span"
      margin={margin}
      className={className}
      style={{ display: "inline-block", ...style }}
    >
      <StyledInternalLink
        href={resolveLinkSync(link)}
        onClick={onClick}
        $color={typeof color === "string" ? color : undefined}
        $weight={weight}
        $size={typeof size === "string" ? size : undefined}
      >
        {label}
      </StyledInternalLink>
    </Box>
  );
};

export default TextLink;