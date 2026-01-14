import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./FireBaseConfig";

export const isUsernameAvailable = async (username) => {
  const ref = doc(db, "usernames", username);
  const snap = await getDoc(ref);
  return !snap.exists();
};

export const reserveUsername = async (username, uid) => {
  const ref = doc(db, "usernames", username);
  await setDoc(ref, { uid });
};
