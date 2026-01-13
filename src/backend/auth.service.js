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

import { auth, db } from "./FireBaseConfig";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

/**
 * Google provider instance
 */
const googleProvider = new GoogleAuthProvider();

/**
 * Signup user + send email verification (Email/Password)
 */
export const signupUser = async (email, password, fullName) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
    fullName
  );

  const user = userCredential.user;
  // let collectionRef = collection(db, "users");

  // 🔥 CREATE USER PROFILE IN FIRESTORE
  await setDoc(doc(db, "users", user.uid), {
    displayName: fullName,
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
  // console.log(userCredential?.user?.accessToken);
  localStorage.setItem("access token", userCredential?.user?.accessToken);
  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    localStorage.removeItem("access token");

    throw new Error("Please verify your email before logging in.");
  }

  return userCredential.user;
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  await signOut(auth);
  localStorage.removeItem("access token");
};

/**
 * Listen to auth state changes
 */
export const getCurrentUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};
