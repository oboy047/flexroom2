"use client";

import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useState } from "react";
import { listRooms } from "@/db/rooms";
import { databases } from "@/db/appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID!;
const ROOMS_ID = import.meta.env.VITE_APPWRITE_ROOMS_COLLECTION_ID!;

export default function Admin() {
  const { isAdmin, loading, user } = useAdmin();
  const [rooms, setRooms] = useState<any[]>([]);
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    capacity: "",
    image: "",
    available: true,
  });

  async function loadRooms() {
    const data = await listRooms();
    setRooms(data);
  }

  async function addRoom(e: React.FormEvent) {
    e.preventDefault();

    await databases.createDocument(DB_ID, ROOMS_ID, "unique()", {
      ...newRoom,
      capacity: Number(newRoom.capacity),
    });

    setNewRoom({
      name: "",
      description: "",
      capacity: "",
      image: "",
      available: true,
    });

    loadRooms();
  }

  async function toggleAvailability(id: string, current: boolean) {
    await databases.updateDocument(DB_ID, ROOMS_ID, id, {
      available: !current,
    });

    loadRooms();
  }

  async function deleteRoom(id: string) {
    await databases.deleteDocument(DB_ID, ROOMS_ID, id);
    loadRooms();
  }

  useEffect(() => {
    if (isAdmin) loadRooms();
  }, [isAdmin]);

  if (loading) return <p>Laster...</p>;
  if (!user) return <p>Du må være logget inn for å se denne siden.</p>;
  if (!isAdmin) return <p>Du har ikke tilgang til admin-panelet.</p>;

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-10">Admin-panel</h1>

      {/* Legg til rom */}
      <div className="mb-12 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Legg til nytt rom</h2>
        <form onSubmit={addRoom} className="space-y-4">
          <input
            type="text"
            placeholder="Romnavn"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <textarea
            placeholder="Beskrivelse"
            value={newRoom.description}
            onChange={(e) =>
              setNewRoom({ ...newRoom, description: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          ></textarea>
          <input
            type="number"
            placeholder="Kapasitet"
            value={newRoom.capacity}
            onChange={(e) =>
              setNewRoom({ ...newRoom, capacity: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Bilde-URL"
            value={newRoom.image}
            onChange={(e) => setNewRoom({ ...newRoom, image: e.target.value })}
            className="border p-2 rounded w-full"
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Legg til rom
          </button>
        </form>
      </div>

      {/* Eksisterende rom */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Eksisterende rom</h2>
        <div className="space-y-4">
          {rooms.map((room) => (
  <div
    key={room.$id}
    className="border p-4 rounded flex items-center justify-between gap-4"
  >
    {/* Bilde */}
    <img
      src={room.image || "https://via.placeholder.com/120x80?text=No+Image"}
      alt={room.name}
      className="w-32 h-20 object-cover rounded"
    />

    {/* Rominfo */}
    <div className="flex-1">
      <h3 className="font-semibold">{room.name}</h3>
      <p className="text-sm">{room.description}</p>
      <p className="text-sm">Kapasitet: {room.capacity}</p>
      <p className="text-sm font-medium">
        Status:{" "}
        <span className={room.available ? "text-green-600" : "text-red-600"}>
          {room.available ? "Ledig" : "Opptatt"}
        </span>
      </p>
    </div>

    {/* Admin-knapper */}
    <div className="flex flex-col gap-2">
      <button
        onClick={() => toggleAvailability(room.$id, room.available)}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        {room.available ? "Sett opptatt" : "Sett ledig"}
      </button>

      <button
        onClick={() => deleteRoom(room.$id)}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Slett
      </button>
    </div>
  </div>
))}

        </div>
      </div>
    </section>
  );
}
