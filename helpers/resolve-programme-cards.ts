import * as prismic from "@prismicio/client";

import {
  asContentRelationship,
  type Link,
  type RichTextBlock,
} from "../lib/prismic-types";
import { resolveLinkSync } from "../prismicio";
import ImageProps from "../types/ImageProps";
import PageType from "../types/PageTypes";

export interface ProgrammeCardData {
  id: string;
  title?: RichTextBlock;
  body?: RichTextBlock;
  icon?: ImageProps;
  link?: {
    url: string;
    uid?: string;
    type?: PageType;
    id?: string;
  };
}

function getDocumentSlices(data: Record<string, unknown>) {
  if (Array.isArray(data.slices) && data.slices.length > 0) {
    return data.slices;
  }

  if (Array.isArray(data.body)) {
    return data.body;
  }

  return [];
}

function getThemePageCardBody(
  data: Record<string, unknown>,
): RichTextBlock | undefined {
  for (const slice of getDocumentSlices(data)) {
    const primary = (slice as { primary?: Record<string, unknown> }).primary;
    if (!primary) {
      continue;
    }

    const body = (primary.body || primary.description) as
      | RichTextBlock
      | undefined;
    if (Array.isArray(body) && body.length > 0) {
      return body;
    }
  }

  return undefined;
}

export function mapDocumentToProgrammeCard(
  document: prismic.PrismicDocument,
): ProgrammeCardData {
  const data = document.data as Record<string, unknown>;
  const link: Link = {
    link_type: "Document",
    id: document.id,
    type: document.type,
    uid: document.uid,
    url: document.url,
  };
  const url = document.url || resolveLinkSync(link);

  if (document.type === PageType.LEARNING_MODULE) {
    return {
      id: document.id,
      title: data.title as RichTextBlock | undefined,
      body: data.bodyShort as RichTextBlock | undefined,
      icon: data.icon as ImageProps | undefined,
      link: {
        url,
        uid: document.uid ?? undefined,
        type: document.type as PageType,
        id: document.id,
      },
    };
  }

  return {
    id: document.id,
    title: data.title as RichTextBlock | undefined,
    body: getThemePageCardBody(data),
    icon: data.image as ImageProps | undefined,
    link: {
      url,
      uid: document.uid ?? undefined,
      type: document.type as PageType,
      id: document.id,
    },
  };
}

export async function resolveProgrammeCardsFromSliceItems(
  client: prismic.Client,
  items: { module?: Link }[] | undefined,
): Promise<ProgrammeCardData[]> {
  if (!items?.length) {
    return [];
  }

  const cards = await Promise.all(
    items.map(async (item) => {
      const moduleLink = item.module;
      const relationship = asContentRelationship(moduleLink);
      if (
        !relationship ||
        !prismic.isFilled.contentRelationship(relationship)
      ) {
        return null;
      }

      if ("isBroken" in relationship && relationship.isBroken) {
        return null;
      }

      try {
        const document = await client.getByID(relationship.id);
        return mapDocumentToProgrammeCard(document);
      } catch {
        return null;
      }
    }),
  );

  return cards.filter((card): card is ProgrammeCardData => card !== null);
}
