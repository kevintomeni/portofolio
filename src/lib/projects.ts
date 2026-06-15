import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getDb } from "./firebase";
import { Project } from "./types";

const COLLECTION = "projects";

export async function getProjects(): Promise<Project[]> {
  const q = query(collection(getDb(), COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const q = query(
    collection(getDb(), COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Project))
    .filter((p) => p.featured);
}

export async function getProject(id: string): Promise<Project | null> {
  const docRef = doc(getDb(), COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Project;
}

export async function addProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collection(getDb(), COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  const docRef = doc(getDb(), COLLECTION, id);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), COLLECTION, id));
}
