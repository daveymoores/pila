import { doc, setDoc, updateDoc } from "firebase/firestore";

import { getFirestoreInstance } from "./firebase";
import { isMockIntegrations } from "./mock-config";

export async function updateUser(uid: string, data: Record<string, unknown>) {
  if (isMockIntegrations()) {
    console.info("[mock] updateUser", { uid, data });
    return;
  }

  const firestore = await getFirestoreInstance();
  return updateDoc(doc(firestore, "users", uid), data);
}

export async function createUser(
  uid: string,
  data: Record<string, unknown> | object,
) {
  if (isMockIntegrations()) {
    console.info("[mock] createUser", { uid, data });
    return;
  }

  const firestore = await getFirestoreInstance();
  return setDoc(
    doc(firestore, "users", uid),
    { uid, ...data },
    { merge: true },
  );
}
