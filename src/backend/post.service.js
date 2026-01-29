import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,

  // ✅ for likes
  setDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";
import { db } from "./FireBaseConfig";

// ✅ CREATE POST
export const createPost = async (postData) => {
  const postsRef = collection(db, "posts");

  const payload = {
    ...postData,
    createdAt: serverTimestamp(),
    flowersCount: 0, // ✅ add this
  };

  const docRef = await addDoc(postsRef, payload);
  return docRef.id;
};

// ✅ GET POSTS OF LOGGED-IN USER
export const getPostsByUser = async (uid) => {
  const postsRef = collection(db, "posts");

  const q = query(
    postsRef,
    where("authorId", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ✅ GET SINGLE POST
export const getPostById = async (postId) => {
  const postRef = doc(db, "posts", postId);
  const snap = await getDoc(postRef);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

// ============================
// 🗑 DELETE POST
// ============================

export const deletePost = async (postId) => {
  const postRef = doc(db, "posts", postId);
  await deleteDoc(postRef);
  return true;
};

// ============================
// 🌸 LIKE SYSTEM (FLOWERS)
// ============================

// ✅ check current user liked or not
export const checkIfLiked = async (postId, uid) => {
  const likeRef = doc(db, "posts", postId, "likes", uid);
  const snap = await getDoc(likeRef);
  return snap.exists();
};

// ✅ toggle like/unlike + update flowersCount safely
export const toggleFlower = async (postId, uid) => {
  const postRef = doc(db, "posts", postId);
  const likeRef = doc(db, "posts", postId, "likes", uid);

  const result = await runTransaction(db, async (transaction) => {
    const postSnap = await transaction.get(postRef);
    if (!postSnap.exists()) throw new Error("Post not found");

    const likeSnap = await transaction.get(likeRef);
    const currentCount = postSnap.data().flowersCount || 0;

    // ✅ if already liked -> unlike
    if (likeSnap.exists()) {
      transaction.delete(likeRef);
      transaction.update(postRef, {
        flowersCount: Math.max(currentCount - 1, 0),
      });

      return { liked: false, flowersCount: Math.max(currentCount - 1, 0) };
    }

    // ✅ else -> like
    transaction.set(likeRef, { createdAt: serverTimestamp() });
    transaction.update(postRef, { flowersCount: currentCount + 1 });

    return { liked: true, flowersCount: currentCount + 1 };
  });

  return result;
};
