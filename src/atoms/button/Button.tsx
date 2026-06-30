import { isFilled } from "@prismicio/client";
import { Button as GrommetButton, ButtonProps } from "grommet";
import NextLink from "next/link";
import React from "react";
import styled, { css } from "styled-components";

import { useAuth } from "../../../lib/auth";
import { gaEvent, GAEventType } from "../../../lib/ga";
import { asLinkField, getLinkUrl, type Link } from "../../../lib/prismic-types";
import { resolveLinkSync } from "../../../prismicio";
import PageType from "../../../types/PageTypes";
import useWebMedia from "../../hooks/useWebMedia";
import { colorPalette, fontWeights } from "../../theme/pila";

const DARK_BUTTON_BACKGROUNDS = new Set<string>([
  colorPalette.green,
  colorPalette.blue,
  colorPalette.dark_blue,
  colorPalette.night_blue,
  colorPalette.patternBlue,
  colorPalette.grey_blue,
  colorPalette.redCrayola,
  colorPalette.grey,
]);

export enum ButtonSizes {
  small = "small",
  large = "large",
}

interface CustomButtonProps extends ButtonProps {
  label?: string;
  link?: Link;
  onClick?: (event: React.SyntheticEvent) => void;
}

interface GrommetButtonProps extends ButtonProps {
  onClick?: (event: React.SyntheticEvent) => void;
  children?: string;
}

const getButtonLabelColor = (color: GrommetButtonProps["color"]) => {
  if (typeof color !== "string") {
    return undefined;
  }

  if (DARK_BUTTON_BACKGROUNDS.has(color)) {
    return colorPalette.white;
  }

  if (
    color === colorPalette.periwinkleCrayola ||
    color === colorPalette.yellow ||
    color === colorPalette.white ||
    color === colorPalette.light_green ||
    color === colorPalette.stormGrey
  ) {
    return colorPalette.dark_blue;
  }

  return undefined;
};

const buttonStyles = css<GrommetButtonProps>`
  border-radius: 10px;
  font-size: ${(props) => (props.size === ButtonSizes.small ? `16px` : `18px`)};
  font-weight: ${fontWeights.bold};
  background-color: ${(props) => props.color};
  padding: ${(props) =>
    props.size === ButtonSizes.small ? `10px 20px` : `15px 35px`};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  cursor: pointer;
`;

const Button: React.FC<CustomButtonProps> = ({
  label = "",
  link,
  onClick,
  size = ButtonSizes.large,
  ...rest
}) => {
  const { auth } = useAuth();
  const handleClick = useWebMedia(link);

  if (!link) {
    return (
      <ButtonWithRef size={size} onClick={onClick} {...rest}>
        {label}
      </ButtonWithRef>
    );
  }

  const filledLink = asLinkField(link);
  if (!isFilled.link(filledLink)) return null;

  if (filledLink.link_type === "Media" || filledLink.link_type === "Web") {
    return (
      <ButtonWithRef size={size} onClick={handleClick} {...rest}>
        {label}
      </ButtonWithRef>
    );
  }

  const href = resolveLinkSync(link);
  const trackCrossSiteClick = (event: React.SyntheticEvent) => {
    if (onClick) {
      onClick(event);
    }

    gaEvent(GAEventType.CROSS_SITE_LINKS, getLinkUrl(filledLink) ?? href);
  };

  const buttonLabel =
    "type" in filledLink && filledLink.type === PageType.SESSIONS && auth
      ? "Start a new session"
      : label;

  return (
    <StyledButtonLink
      href={href}
      onClick={trackCrossSiteClick}
      size={size}
      {...rest}
    >
      {buttonLabel}
    </StyledButtonLink>
  );
};

const GROMMET_BUTTON_STYLE_PROPS = new Set([
  "primary",
  "secondary",
  "tertiary",
  "plain",
  "busy",
  "icon",
  "label",
  "tip",
  "fill",
  "reverse",
  "badge",
  "kind",
  "dropAlign",
  "dropProps",
  "color",
  "size",
]);

const ButtonWithRef = React.forwardRef<HTMLButtonElement, GrommetButtonProps>(
  ({ onClick, children, ...rest }, ref) => {
    return (
      <StyledButton
        ref={ref as React.Ref<never>}
        label={children}
        onClick={onClick}
        {...rest}
      />
    );
  },
);

ButtonWithRef.displayName = "ButtonWithRef";

const labelColorOverride = css<GrommetButtonProps>`
  ${(props) => {
    const labelColor = getButtonLabelColor(props.color);

    if (!labelColor) {
      return "";
    }

    return css`
      &,
      & * {
        color: ${labelColor} !important;
      }
    `;
  }}
`;

const StyledButton = styled(GrommetButton)<GrommetButtonProps>`
  ${buttonStyles}
  ${labelColorOverride}
`;

const StyledButtonLink = styled(NextLink).withConfig({
  shouldForwardProp: (prop) => !GROMMET_BUTTON_STYLE_PROPS.has(prop),
})<GrommetButtonProps>`
  ${buttonStyles}
  ${labelColorOverride}
`;

export default Button;
