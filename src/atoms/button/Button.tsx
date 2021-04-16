import { Button as GrommetButton, ButtonProps } from "grommet";
import Link from "next/link";
import { Link as LinkProps } from "prismic-reactjs";
import React, { ForwardedRef } from "react";
import styled from "styled-components";

import { hrefResolver, linkResolver } from "../../../prismic";
import LearningModulesContext from "../../context/LearningModulesContext";
import { colorPalette, fontWeights } from "../../theme/pila";

export enum ButtonSizes {
  small = "small",
  large = "large",
}

interface CustomButtonProps extends ButtonProps {
  label: string;
  link: LinkProps;
  onClick?: (event: React.SyntheticEvent) => void;
}

interface GrommetButtonProps extends ButtonProps {
  onClick?: (event: React.SyntheticEvent) => void;
  children: string;
}

export const Button: React.FC<CustomButtonProps> = ({
  label,
  link,
  onClick,
  size = ButtonSizes.large,
  ...rest
}) => {
  const learningModules = React.useContext(LearningModulesContext);
  return (
    <Link
      href={hrefResolver(link) || "/"}
      as={linkResolver(link, learningModules)}
      passHref
    >
      <ButtonWithRef size={size} onClick={onClick} {...rest}>
        {label}
      </ButtonWithRef>
    </Link>
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
`;

export default Button;
