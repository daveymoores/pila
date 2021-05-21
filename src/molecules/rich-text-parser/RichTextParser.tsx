import { Anchor, Box, Heading, Paragraph } from "grommet";
import { useRouter } from "next/router";
import { RichTextBlock } from "prismic-reactjs";
import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import { hrefResolver, linkResolver } from "../../../prismic";
import CustomType from "../../../types/CustomType";
import useLinkResolver from "../../hooks/useLinkResolver";

interface RichTextProps {
  body: RichTextBlock[];
  className?: string;
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

const onClickHandler = (href: string, as: string) => {
  const Router = useRouter();
  // Handler that will do routing imperatively on internal links
  return (event: React.SyntheticEvent) => {
    event.preventDefault();
    Router.push(href, as);
  };
};

const propsWithUniqueKey = (props: Record<string, unknown>, key: string) => {
  return Object.assign(props || {}, { key });
};

export const htmlSerializer = (
  type: string,
  element: CustomType<any>,
  content: string,
  children: React.ReactNode[],
  key: string
): React.ReactElement | null => {
  switch (type) {
    case Elements.heading1:
      return (
        <StyledHeading key={key} level={1} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading2:
      return (
        <StyledHeading key={key} level={2} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading3:
      return (
        <StyledHeading key={key} level={3} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading4:
      return (
        <StyledHeading key={key} level={4} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading5:
      return (
        <StyledHeading key={key} level={5} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.heading6:
      return (
        <StyledHeading key={key} level={6} size={"small"}>
          {children}
        </StyledHeading>
      );
    case Elements.paragraph:
      return <StyledParagraph key={key}>{children}</StyledParagraph>;
    case Elements.em:
      return (
        <span key={key} style={{ fontStyle: "italic" }}>
          {children}
        </span>
      );
    case Elements.strong:
      return (
        <span key={key} style={{ fontWeight: 500 }}>
          {children}
        </span>
      );
    case Elements.list:
      return (
        <StyledList key={key} as={"ul"}>
          {children}
        </StyledList>
      );
    case Elements.oList:
      return (
        <StyledOrderedList key={key} as={"ol"}>
          {children}
        </StyledOrderedList>
      );
    case Elements.listItem:
    case Elements.oListItem:
      return (
        <StyledListItem key={key} as={"li"}>
          {children}
        </StyledListItem>
      );
    case Elements.hyperlink: // Link
      if (element.data.link_type === "Document") {
        const as = useLinkResolver(element.data);
        // Only for internal links add the new onClick that will imperatively route to the appropriate page
        const props = Object.assign({
          onClick: onClickHandler(hrefResolver(element.data), as),
          href: as,
        });
        return <Anchor {...props}>{children}</Anchor>;
      } else {
        // Default link handling
        const targetAttr = element.data.target
          ? { target: element.data.target }
          : {};
        const relAttr = element.data.target ? { rel: "noopener" } : {};
        const props = Object.assign(
          {
            href: element.data.url || linkResolver(element.data),
          },
          targetAttr,
          relAttr
        );
        return <Anchor {...props}>{children}</Anchor>;
      }

    default:
      return null;
  }
};

const RichTextParser: React.FC<RichTextProps> = ({ body, className }) => {
  return (
    <Box className={className}>
      <RichText render={body} htmlSerializer={htmlSerializer} />
    </Box>
  );
};

const StyledHeading = styled(Heading)`
  margin-bottom: 0.6em;
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 1em;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 24px;
  }
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
