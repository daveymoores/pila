import { NextApiRequest, NextApiResponse } from "next";

import { auth } from "../../lib/firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // TODO - check this token type
    const { uid } = await auth.verifyIdToken(req.headers.token as string);

    res.status(200).json({ uid });
  } catch (error) {
    res.status(401).json({ error });
  }
};
