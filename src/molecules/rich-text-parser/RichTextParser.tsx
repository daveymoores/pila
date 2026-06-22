import type { LinkField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Anchor, Box, Heading, Paragraph } from "grommet";
import NextLink from "next/link";
import React from "react";
import styled from "styled-components";

import { gaEvent, GAEventType } from "../../../lib/ga";
import type { RichTextBlock } from "../../../lib/prismic-types";
import { hrefResolver, resolveLinkSync } from "../../../prismicio";

interface RichTextProps {
  body: RichTextBlock;
  className?: string;
}

const RichTextHyperlink: React.FC<{
  field: LinkField;
  children: React.ReactNode;
}> = ({ field, children }) => {
  const resolvedHref = resolveLinkSync(field) || hrefResolver(field);

  if (field.link_type === "Document") {
    return (
      <StyledDocumentLink
        href={resolvedHref}
        onClick={() => gaEvent(GAEventType.CROSS_SITE_LINKS, resolvedHref)}
      >
        {children}
      </StyledDocumentLink>
    );
  }

  const webField =
    field.link_type === "Web" || field.link_type === "Media" ? field : null;
  const target = webField && "target" in webField ? webField.target : undefined;
  const targetAttr = target ? { target } : {};
  const relAttr = target ? { rel: "noopener" } : {};
  const props = Object.assign(
    {
      href: webField?.url || "",
    },
    targetAttr,
    relAttr,
  );

  return <Anchor {...props}>{children}</Anchor>;
};

const richTextComponents = {
  heading1: ({ children }: { children: React.ReactNode }) => (
    <StyledHeading level={1} size={"small"}>
      {children}
    </StyledHeading>
  ),
  heading2: ({ children }: { children: React.ReactNode }) => (
    <StyledHeading level={2} size={"small"}>
      {children}
    </StyledHeading>
  ),
  heading3: ({ children }: { children: React.ReactNode }) => (
    <StyledHeading level={3} size={"small"}>
      {children}
    </StyledHeading>
  ),
  heading4: ({ children }: { children: React.ReactNode }) => (
    <StyledHeading level={4} size={"small"}>
      {children}
    </StyledHeading>
  ),
  heading5: ({ children }: { children: React.ReactNode }) => (
    <StyledHeading level={5} size={"small"}>
      {children}
    </StyledHeading>
  ),
  heading6: ({ children }: { children: React.ReactNode }) => (
    <StyledHeading level={6} size={"small"}>
      {children}
    </StyledHeading>
  ),
  paragraph: ({ children }: { children: React.ReactNode }) => (
    <StyledParagraph>{children}</StyledParagraph>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <span style={{ fontStyle: "italic" }}>{children}</span>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <span style={{ fontWeight: 500 }}>{children}</span>
  ),
  list: ({ children }: { children: React.ReactNode }) => (
    <StyledList as={"ul"}>{children}</StyledList>
  ),
  oList: ({ children }: { children: React.ReactNode }) => (
    <StyledOrderedList as={"ol"}>{children}</StyledOrderedList>
  ),
  listItem: ({ children }: { children: React.ReactNode }) => (
    <StyledListItem as={"li"}>{children}</StyledListItem>
  ),
  oListItem: ({ children }: { children: React.ReactNode }) => (
    <StyledListItem as={"li"}>{children}</StyledListItem>
  ),
  hyperlink: ({
    node,
    children,
  }: {
    node: { data: LinkField };
    children: React.ReactNode;
  }) => <RichTextHyperlink field={node.data}>{children}</RichTextHyperlink>,
};

const RichTextParser: React.FC<RichTextProps> = ({ body, className }) => {
  return (
    <Box className={className}>
      <PrismicRichText field={body} components={richTextComponents} />
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

const StyledDocumentLink = styled(NextLink)`
  color: inherit;
  text-decoration: underline;
`;

export default RichTextParser;
