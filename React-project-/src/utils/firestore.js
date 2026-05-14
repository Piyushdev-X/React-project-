import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function addTask(task) {
  await addDoc(collection(db, "tasks"), { ...task, createdAt: serverTimestamp() });
}

export async function updateTask(id, updates) {
  await updateDoc(doc(db, "tasks", id), updates);
}

export async function addActivity(text) {
  await addDoc(collection(db, "activity"), {
    id: Math.random().toString(36).slice(2, 9),
    text,
    at: new Date().toISOString(),
    createdAt: serverTimestamp(),
  });
}