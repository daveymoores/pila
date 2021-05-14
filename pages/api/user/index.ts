import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

import { auth } from "../../../lib/firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedCookies = parseCookies({ req });
    const { uid } = await auth.verifyIdToken(parsedCookies.token);

    res.status(200).json({ uid });
  } catch (error) {
    res.status(401).json({ error });
  }
};
