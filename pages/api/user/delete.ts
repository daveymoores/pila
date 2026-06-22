import { NextApiRequest, NextApiResponse } from "next";
import nookies, { parseCookies } from "nookies";

import { getFirebaseAdminAuth } from "../../../lib/firebase-admin";
import {
  isMockAuthToken,
  isMockIntegrations,
  MOCK_AUTH_UID,
} from "../../../lib/mock-config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedCookies = parseCookies({ req });
    const token = parsedCookies.token;

    if (isMockIntegrations() && isMockAuthToken(token)) {
      nookies.destroy({ res }, "token");
      return res
        .status(200)
        .json({ success: "Mock user deleted", uid: MOCK_AUTH_UID });
    }

    const { uid } = await getFirebaseAdminAuth().verifyIdToken(token);
    await getFirebaseAdminAuth().deleteUser(uid);
    nookies.destroy({ res }, "token");
    res.status(200).json({ success: "User deleted" });
  } catch (error) {
    res.status(401).json({ error });
  }
};
