import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth, db } from "./FireBaseConfig";
import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";

/**
 * Google provider instance
 */
const googleProvider = new GoogleAuthProvider();

/**
 * 🔍 Check if username is available
 */
const isUsernameAvailable = async (username) => {
  const ref = doc(db, "usernames", username);
  const snap = await getDoc(ref);
  return !snap.exists();
};

/**
 * 🏷 Reserve username
 */
const reserveUsername = async (username, uid) => {
  await setDoc(doc(db, "usernames", username), { uid });
};

/**
 * 🔐 Signup user (Email/Password) + Username
 */
export const signupUser = async (email, password, fullName, username) => {
  const cleanUsername = username.toLowerCase();

  // 1️⃣ Check username uniqueness
  const available = await isUsernameAvailable(cleanUsername);
  if (!available) {
    throw new Error("Username already taken");
  }

  // 2️⃣ Create auth user
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // 3️⃣ Create user profile
  await setDoc(doc(db, "users", user.uid), {
    displayName: fullName,
    username: cleanUsername,
    email,
    bio: "",
    photoURL: "",
    isAnonymous: false,
    createdAt: serverTimestamp(),
  });

  // 4️⃣ Reserve username (🔥 uniqueness guaranteed)
  await reserveUsername(cleanUsername, user.uid);

  // 5️⃣ Send verification email
  await sendEmailVerification(user);

  // 6️⃣ Logout until verified
  await signOut(auth);

  return true;
};

/**
 * 🔐 Signup / Login with Google
 * (auto-verified users)
 */
export const signupWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const username = user.email.split("@")[0].toLowerCase();

  // create profile only if not exists
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    let finalUsername = username;
    let counter = 1;

    // ensure username uniqueness
    while (!(await isUsernameAvailable(finalUsername))) {
      finalUsername = `${username}${counter}`;
      counter++;
    }

    await setDoc(userRef, {
      displayName: user.displayName || "Anonymous Ghost",
      username: finalUsername,
      email: user.email,
      bio: "",
      photoURL: user.photoURL || "",
      isAnonymous: false,
      createdAt: serverTimestamp(),
    });

    await reserveUsername(finalUsername, user.uid);
  }

  return user;
};

/**
 * 🔑 Login user (email must be verified)
 */
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  localStorage.setItem("access token", userCredential.user.accessToken);

  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    localStorage.removeItem("access token");
    throw new Error("Please verify your email before logging in.");
  }

  return userCredential.user;
};

/**
 * 🔑 Forgot Password
 */
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  return true;
};

/**
 * 🚪 Logout user
 */
export const logoutUser = async () => {
  await signOut(auth);
  localStorage.removeItem("access token");
};

/**
 * 👂 Listen to auth state changes
 */
export const getCurrentUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};
