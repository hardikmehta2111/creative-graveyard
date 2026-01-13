import { doc, getDoc } from "firebase/firestore";
import { db } from "./FireBaseConfig";

export const getUserProfile = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Profile not found");
  }

  return snap.data();
};
