import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
//   GoogleAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "./FireBaseConfig";

/**
 * Google provider instance
 */
const googleProvider = new GoogleAuthProvider();

/**
 * Signup user + send email verification (Email/Password)
 */
export const signupUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // 🔥 CREATE USER PROFILE IN FIRESTORE
  await setDoc(doc(db, "users", user.uid), {
    displayName: "Anonymous Ghost",
    bio: "",
    photoURL: "",
    isAnonymous: false,
    createdAt: serverTimestamp(),
  });

  // Send verification email
  await sendEmailVerification(user);

  // Logout user until verified
  await signOut(auth);

  return true;
};


/**
 * Signup / Login with Google
 * (Google users are already verified)
 */
export const signupWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

/**
 * Login user (email must be verified)
 */
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    throw new Error("Please verify your email before logging in.");
  }

  return userCredential.user;
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  await signOut(auth);
};

/**
 * Listen to auth state changes
 */
export const getCurrentUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};
