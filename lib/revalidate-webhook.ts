import * as prismic from "@prismicio/client";

import { getPathsToRevalidate, LISTING_PATHS } from "./revalidate-paths";

/**
 * Prismic webhooks send document IDs (strings), not full documents.
 * Fetch each document and resolve paths; on fetch failure (e.g. unpublish),
 * fall back to listing paths so ISR picks up removals within one revalidation.
 */
export async function resolvePathsFromWebhookDocumentIds(
  client: prismic.Client,
  documentIds: string[],
): Promise<string[]> {
  const paths = new Set<string>();

  for (const id of documentIds) {
    try {
      const document = await client.getByID(id);
      for (const path of getPathsToRevalidate(document)) {
        paths.add(path);
      }
    } catch {
      for (const path of LISTING_PATHS) {
        paths.add(path);
      }
    }
  }

  return [...paths];
}
