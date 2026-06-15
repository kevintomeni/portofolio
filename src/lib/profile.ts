import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDb } from "./firebase";
import { Profile } from "./types";

const DOC_ID = "main";

export async function getProfile(): Promise<Profile | null> {
  const docRef = doc(getDb(), "profile", DOC_ID);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return docSnap.data() as Profile;
}

export async function updateProfile(data: Profile): Promise<void> {
  const docRef = doc(getDb(), "profile", DOC_ID);
  await setDoc(docRef, data, { merge: true });
}
