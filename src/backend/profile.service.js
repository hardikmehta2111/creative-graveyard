import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./FireBaseConfig";

/**
 * 🔍 Get user profile
 */
export const getUserProfile = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Profile not found");
  }

  return { id: snap.id, ...snap.data() };
};

/**
 * ✏️ Update user profile (Edit Profile)
 * Allowed fields only
 */
export const updateUserProfile = async (uid, updates) => {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  return true;
};
