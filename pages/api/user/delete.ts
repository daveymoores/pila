import { NextApiRequest, NextApiResponse } from "next";
import nookies, { parseCookies } from "nookies";

import { auth } from "../../../lib/firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedCookies = parseCookies({ req });
    const { uid } = await auth.verifyIdToken(parsedCookies.token);
    await auth.deleteUser(uid);
    nookies.destroy({ res }, "token");
    res.status(200).json({ success: "User deleted" });
  } catch (error) {
    res.status(401).json({ error });
  }
};
