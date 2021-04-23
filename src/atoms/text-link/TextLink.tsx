import { Anchor, AnchorProps } from "grommet";
import { Link as LinkProps } from "prismic-reactjs";
import React, { ForwardedRef } from "react";

import RoutedLink from "../routed-link/RoutedLink";

interface CustomLinkProps extends AnchorProps {
  label: string;
  link: LinkProps;
  onClick?: (event: React.SyntheticEvent) => void;
}

interface GrommetLinkProps extends AnchorProps {
  onClick?: (event: React.SyntheticEvent) => void;
  children: string;
}

export const TextLink: React.FC<CustomLinkProps> = ({
  label,
  link,
  onClick,
  ...rest
}) => {
  return (
    <RoutedLink link={link}>
      <GrommetLink onClick={onClick} {...rest}>
        {label}
      </GrommetLink>
    </RoutedLink>
  );
};

// eslint-disable-next-line react/display-name
const GrommetLink = React.forwardRef(
  (
    { onClick, href, children, ...rest }: GrommetLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <Anchor
        label={children}
        href={href}
        onClick={onClick}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default TextLink;