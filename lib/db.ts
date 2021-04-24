import { getFirestoreInstance } from "./firebase";

export async function updateUser(uid: string, data: any) {
  const firestore = await getFirestoreInstance();
  return firestore.collection("users").doc(uid).update(data);
}

export async function createUser(uid: string, data: any) {
  const firestore = await getFirestoreInstance();
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
