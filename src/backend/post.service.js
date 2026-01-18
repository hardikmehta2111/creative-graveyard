import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./FireBaseConfig";

// ✅ CREATE POST
export const createPost = async (postData) => {
  
  const postsRef = collection(db, "posts");

  const payload = {
    ...postData,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(postsRef, payload);
  return docRef.id;
};

// ✅ GET POSTS OF LOGGED-IN USER (for profile page)
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
