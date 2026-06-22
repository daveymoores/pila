import { redirectToPreviewURL, setPreviewData } from "@prismicio/next/pages";
import type { NextApiRequest, NextApiResponse } from "next";

import { createClient } from "../../prismicio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = createClient({ req });

  setPreviewData({ req, res });

  await redirectToPreviewURL({ req, res, client });
}
