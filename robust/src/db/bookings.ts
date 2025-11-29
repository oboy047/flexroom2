// src/db/bookings.ts
import { databases, ID } from "./appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID!;
const BOOKINGS_ID = import.meta.env.VITE_APPWRITE_BOOKINGS_COLLECTION_ID!;


export async function createBooking(roomId: string, userId: string, date: string) {
await databases.createDocument(DB_ID, BOOKINGS_ID, ID.unique(), {
  roomId,
  userId,
  date,
});

}
