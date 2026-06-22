import type {
  ContentRelationshipField,
  FilledContentRelationshipField,
  LinkField,
  RichTextField,
} from "@prismicio/client";

/** Legacy alias used across the codebase */
export type RichTextBlock = RichTextField;

/** Legacy alias — includes partial link objects used in breadcrumbs and internal routing */
export type Link =
  | FilledContentRelationshipField
  | LinkField
  | {
      link_type?: string;
      type?: string;
      uid?: string | null;
      url?: string | null;
      id?: string;
      tags?: string[];
      lang?: string;
      target?: string;
      name?: string;
      data?: Record<string, unknown>;
      [key: string]: unknown;
    };

export function asLinkField(link?: Link | null): LinkField {
  return link as LinkField;
}

export function asContentRelationship(
  link?: Link | null,
): ContentRelationshipField | null | undefined {
  return link as ContentRelationshipField | null | undefined;
}

export function getLinkUrl(link?: Link | null): string | undefined {
  if (!link || typeof link !== "object" || !("url" in link)) {
    return undefined;
  }

  return link.url ?? undefined;
}

export function getLinkUid(link?: Link | null): string | undefined {
  if (!link || typeof link !== "object" || !("uid" in link)) {
    return undefined;
  }

  return link.uid ?? undefined;
}
