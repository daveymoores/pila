import { NextApiRequest, NextApiResponse } from "next";

import pila from "../../src/theme/pila";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  res.json(pila);
};
