import { Box, Heading, Paragraph } from "grommet";
import { useRouter } from "next/router";
import { RichTextBlock } from "prismic-reactjs";
import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import { hrefResolver, linkResolver } from "../../../prismic";
import LearningModulesContext from "../../context/LearningModulesContext";

interface RichTextProps {
  body: RichTextBlock[];
}

enum Elements {
  heading1 = "heading1",
  heading2 = "heading2",
  heading3 = "heading3",
  heading4 = "heading4",
  heading5 = "heading5",
  heading6 = "heading6",
  paragraph = "paragraph",
  preformatted = "preformatted",
  strong = "strong",
  em = "em",
  listItem = "list-item",
  oListItem = "o-list-item",
  list = "group-list-item",
  oList = "group-o-list-item",
  image = "image",
  embed = "embed",
  hyperlink = "hyperlink",
  label = "label",
  span = "span",
}

type Link = {
  link_type?: "Web" | "Document" | "Media" | "Any";
  url?: string;
  target?: string;
  id?: string;
  uid?: string;
  isBroken?: boolean;
  lang?: string;
  slug?: string;
  tags?: string[];
  type?: string;
  height?: string;
  kind?: string;
  name?: string;
  size?: string;
  width?: string;
};

const onClickHandler = function (href, as) {
  const Router = useRouter();
  // Handler that will do routing imperatively on internal links
  return (event) => {
    event.preventDefault();
    Router.push(href, as);
  };
};

const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};

export const htmlSerializer = (type, element, content, children, key) => {
  const learningModules = React.useContext(LearningModulesContext);
  console.log(type);
  switch (type) {
    case Elements.heading1:
      return (
        <StyledHeading level={1} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading2:
      return (
        <StyledHeading level={2} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading3:
      return (
        <StyledHeading level={3} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading4:
      return (
        <StyledHeading level={4} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading5:
      return (
        <StyledHeading level={5} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading6:
      return (
        <StyledHeading level={6} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.paragraph:
      return <StyledParagraph>{children}</StyledParagraph>;
    case Elements.em:
      return <span style={{ fontStyle: "italic" }}>{children}</span>;
    case Elements.strong:
      return <span style={{ fontWeight: 500 }}>{children}</span>;
    case Elements.list:
      return <StyledList as={"ul"}>{children}</StyledList>;
    case Elements.oList:
      return <StyledOrderedList as={"ol"}>{children}</StyledOrderedList>;
    case Elements.listItem:
    case Elements.oListItem:
      return <StyledListItem as={"li"}>{children}</StyledListItem>;
    case Elements.hyperlink: // Link
      if (element.data.link_type === "Document") {
        // Only for internal links add the new onClick that will imperatively route to the appropriate page
        const props = Object.assign({
          onClick: onClickHandler(
            hrefResolver(element.data),
            linkResolver(element.data, learningModules)
          ),
          href: linkResolver(element.data, learningModules),
        });
        return React.createElement(
          "a",
          propsWithUniqueKey(props, key),
          children
        );
      } else {
        // Default link handling
        const targetAttr = element.data.target
          ? { target: element.data.target }
          : {};
        const relAttr = element.data.target ? { rel: "noopener" } : {};
        const props = Object.assign(
          {
            href:
              element.data.url || linkResolver(element.data, learningModules),
          },
          targetAttr,
          relAttr
        );
        return React.createElement(
          "a",
          propsWithUniqueKey(props, key),
          children
        );
      }

    default:
      return null;
  }
};

const RichTextParser: React.FC<RichTextProps> = ({ body }) => {
  return (
    <Box>
      <RichText render={body} htmlSerializer={htmlSerializer} />
    </Box>
  );
};

const StyledHeading = styled(Heading)`
  margin-bottom: 0.6em;
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 1em;
`;

const StyledOrderedList = styled(Box)`
  display: list-item;
  margin-left: 1em;
  margin-bottom: 1em;
  list-style: decimal;
`;

const StyledList = styled(Box)`
  display: list-item;
  margin-left: 1em;
  margin-bottom: 1em;
  list-style: disc;
`;

const StyledListItem = styled(Box)`
  margin-bottom: 0.6em;
`;

export default RichTextParser;
