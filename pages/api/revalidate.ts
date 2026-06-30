import type { NextApiRequest, NextApiResponse } from "next";

import { parseRequestBody } from "../../lib/parse-request-body";
import { PRISMIC_REVALIDATE_SECRET } from "../../lib/revalidate-config";
import { resolvePathsFromWebhookDocumentIds } from "../../lib/revalidate-webhook";
import { createClient } from "../../prismicio";

interface PrismicWebhookBody {
  type?: string;
  documents?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.query.secret !== PRISMIC_REVALIDATE_SECRET) {
    return res.status(401).json({ error: "Invalid secret" });
  }

  let body: PrismicWebhookBody;

  try {
    body = parseRequestBody<PrismicWebhookBody>(req);
  } catch {
    return res.status(400).json({ error: "Invalid request body" });
  }

  if (body.type === "test-trigger") {
    return res
      .status(200)
      .json({ revalidated: true, message: "Webhook test OK" });
  }

  const client = createClient();
  const paths = await resolvePathsFromWebhookDocumentIds(
    client,
    body.documents ?? [],
  );

  const revalidated: string[] = [];
  const failed: { path: string; error: string }[] = [];

  for (const path of paths) {
    try {
      await res.revalidate(path);
      revalidated.push(path);
    } catch (error) {
      failed.push({
        path,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  if (failed.length > 0) {
    return res.status(500).json({ revalidated, failed });
  }

  return res.status(200).json({ revalidated });
}
