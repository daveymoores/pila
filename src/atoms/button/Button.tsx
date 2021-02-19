import { Button as GrommetButton, ButtonProps } from "grommet";
import React from "react";
import styled from "styled-components";

export enum ButtonSizes {
  small = "small",
  large = "large",
}

interface BtnProps extends Omit<ButtonProps, "size" | "color"> {
  size: keyof typeof ButtonSizes;
  color: string;
}

const Button: React.FC<BtnProps> = (props) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled(GrommetButton)<BtnProps>`
  border-radius: 10px;
  font-size: ${(props) => (props.size === ButtonSizes.small ? `16px` : `18px`)};
  font-weight: bold;
  background-color: ${(props) => props.color};
  padding: ${(props) =>
    props.size === ButtonSizes.small ? `10px 20px` : `15px 35px`};
`;

export default Button;
