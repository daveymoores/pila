import { Box } from "grommet";
import { FormNext } from "grommet-icons";
import { Link } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import { RoutedTextLink } from "../../../prismic";
import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";

export interface BreadcrumbProps {
  links: {
    link: Link;
    label: string;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <Section>
      <StyledBox justify={"start"} align={"center"} direction={"row"}>
        {Array.isArray(links) &&
          links.map(({ label, link }, index, array) => (
            <React.Fragment key={index}>
              <StyledLink
                label={label}
                link={link}
                weight={"normal"}
                size={"small"}
                color={colorPalette.dark_blue}
              />
              {index === array.length - 1 ? null : (
                <StyledFormNext
                  color={colorPalette.dark_blue}
                  width={"10px"}
                  height={"10px"}
                />
              )}
            </React.Fragment>
          ))}
      </StyledBox>
    </Section>
  );
};

// TODO - find tokens for this
const StyledBox = styled(Box)`
  padding-top: 50px;

  @media (min-width: 600px) {
    padding-top: 20px;
  }
`;

const StyledLink = styled(RoutedTextLink)`
  opacity: 0.5;
  font-size: 14px;
`;

const StyledFormNext = styled(FormNext)`
  opacity: 0.5;
  height: 18px;
  width: 18px;
  padding: 0 6px;
`;

export default Breadcrumb;
