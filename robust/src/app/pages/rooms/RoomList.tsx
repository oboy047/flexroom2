"use client";

import { useEffect, useState } from "react";
import { listRooms } from "@/db/rooms";

type Room = {
  $id: string;
  name: string;
  description: string;
  capacity: number;
  image?: string | null;
  available?: boolean;
};

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        const data = await listRooms();

        const typed = (data as any[]).map((doc) => ({
          $id: doc.$id,
          name: doc.name,
          description: doc.description,
          capacity: doc.capacity,
          image: doc.image ?? null,
          available: doc.available ?? true,
        }));

        setRooms(typed.filter((r) => r.name && r.capacity));
      } catch (err: any) {
        console.error("Feil ved henting av rom:", err);
        setError(err?.message ?? "Noe gikk galt ved henting av rom.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-gray-600">Laster rom...</p>;
  }

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <p className="text-red-600 font-semibold mb-2">
          Klarte ikke å hente rom 😕
        </p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!rooms.length) {
    return (
      <p className="p-6 text-center text-gray-600">
        Ingen rom funnet. Har du importert CSV-en i Appwrite?
      </p>
    );
  }

  return (
    <section className="roomlist-section">
      <h1 className="roomlist-heading">Rom</h1>

      <div className="roomlist-grid">
        {rooms.map((room) => (
          <a
            key={room.$id}
            href={`/rooms/${room.$id}`}
            className="roomlist-card"
          >
            {/* Bilde */}
            <div className="roomlist-image-wrapper">
              <img
                src={room.image || "https://placehold.co/600x400?text=Room"}
                alt={room.name}
                className="roomlist-image"
              />
            </div>

            {/* Innhold */}
            <div className="roomlist-content">
              <h2 className="roomlist-title">{room.name}</h2>
              <p className="roomlist-description">{room.description}</p>

              <p className="roomlist-capacity">
                Kapasitet: {room.capacity} personer
              </p>

              <p
                className={`roomlist-status ${
                  room.available ? "available" : "busy"
                }`}
              >
                {room.available ? "Ledig" : "Opptatt"}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
