// src/db/rooms.ts
import { databases } from "./appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const ROOMS_ID = import.meta.env.VITE_APPWRITE_ROOMS_COLLECTION_ID;

export async function listRooms() {
  console.log("Bruker DB_ID:", DB_ID, "ROOMS_ID:", ROOMS_ID);
  const result = await databases.listDocuments(DB_ID, ROOMS_ID);
  console.log("Resultat fra Appwrite:", result);
  return result.documents;
}

export async function getRoomById(id: string) {
  console.log("Henter rom med id:", id);
  const result = await databases.getDocument(DB_ID, ROOMS_ID, id);
  return result;
}
