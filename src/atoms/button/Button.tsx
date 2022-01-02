import { Button as GrommetButton, ButtonProps } from "grommet";
import { Link as LinkProps } from "prismic-reactjs";
import React, { ForwardedRef } from "react";
import styled from "styled-components";

import { useAuth } from "../../../lib/auth";
import PageType from "../../../types/PageTypes";
import useWebMedia from "../../hooks/useWebMedia";
import { colorPalette, fontWeights } from "../../theme/pila";
import RoutedLink from "../routed-link/RoutedLink";

export enum ButtonSizes {
  small = "small",
  large = "large",
}

interface CustomButtonProps extends ButtonProps {
  label?: string;
  link?: LinkProps;
  onClick?: (event: React.SyntheticEvent) => void;
}

interface GrommetButtonProps extends ButtonProps {
  onClick?: (event: React.SyntheticEvent) => void;
  children: string;
}

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

  if (link.isBroken) return null;

  if (link.link_type === "Media" || link.link_type === "Web") {
    return (
      <ButtonWithRef size={size} onClick={handleClick} {...rest}>
        {label}
      </ButtonWithRef>
    );
  }

  if (link.type === PageType.SESSIONS) {
    const buttonLabel = auth ? "Start a new session" : label;
    return (
      <RoutedLink link={link}>
        <ButtonWithRef  size={size} onClick={onClick} {...rest}>
          {buttonLabel}
        </ButtonWithRef>
      </RoutedLink>
    );
  }

  return (
    <RoutedLink link={link}>
      <ButtonWithRef size={size} onClick={onClick} {...rest}>
        {label}
      </ButtonWithRef>
    </RoutedLink>
  );
};

// eslint-disable-next-line react/display-name
const ButtonWithRef = React.forwardRef(
  (
    { onClick, href, children, ...rest }: GrommetButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <StyledButton
        label={children}
        href={href}
        onClick={onClick}
        {...rest}
        ref={ref}
      />
    );
  }
);

const StyledButton = styled(GrommetButton)<GrommetButtonProps>`
  border-radius: 10px;
  font-size: ${(props) => (props.size === ButtonSizes.small ? `16px` : `18px`)};
  font-weight: ${fontWeights.bold};
  background-color: ${(props) => props.color};
  padding: ${(props) =>
    props.size === ButtonSizes.small ? `10px 20px` : `15px 35px`};
  color: ${(props) => props.color === colorPalette.green && "white"};
  text-align: center;
`;

export default Button;
