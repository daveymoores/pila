import { Box, ResponsiveContext } from "grommet";
import { FormNext, FormPrevious } from "grommet-icons";
import { Link } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import TextLink from "../../atoms/text-link/TextLink";
import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";

export interface BreadcrumbItem {
  link: Link;
  label: string;
}

export interface BreadcrumbProps {
  links: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Section>
      {size === "small" ? (
        <StyledBox justify={"start"} align={"center"} direction={"row"}>
          <Box
            justify={"start"}
            align={"center"}
            direction={"row"}
            background={colorPalette.periwinkleCrayola}
            pad={{ vertical: "small", horizontal: "medium" }}
            round={"large"}
            style={{ fontSize: "14px" }}
          >
            {Array.isArray(links) && (
              <React.Fragment>
                <StyledFormPrevious
                  color={colorPalette.dark_blue}
                  width={"10px"}
                  height={"10px"}
                />
                <StyledMobileLink
                  label={links[links.length - 2].label}
                  link={links[links.length - 2].link}
                  weight={"normal"}
                  size={"small"}
                  color={colorPalette.dark_blue}
                />
              </React.Fragment>
            )}
          </Box>
        </StyledBox>
      ) : (
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
      )}
    </Section>
  );
};

const StyledBox = styled(Box)`
  padding-top: 50px;

  @media (min-width: 600px) {
    padding-top: 20px;
  }
`;

const StyledLink = styled(TextLink)`
  opacity: 0.5;
  font-size: 14px;
`;

const StyledMobileLink = styled(TextLink)`
  font-size: inherit;
`;

const StyledFormNext = styled(FormNext)`
  opacity: 0.5;
  height: 18px;
  width: 18px;
  padding: 0 6px;
`;

const StyledFormPrevious = styled(FormPrevious)`
  height: 18px;
  width: 18px;
  padding: 0 6px 0 0;
`;

export default Breadcrumb;
