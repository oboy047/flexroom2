"use client";

import React, { useEffect, useState } from "react";
import { getRoomById } from "@/db/rooms";

type RoomDetailProps = {
  params: { id: string };
};

export function RoomDetail({ params }: RoomDetailProps) {
  const [room, setRoom] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getRoomById(params.id);
        setRoom(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return <p className="p-6 text-center text-gray-600">Laster rom...</p>;
  }

  if (!room) {
    return <p className="p-6 text-center text-gray-600">Rom ikke funnet.</p>;
  }

  const mapQuery = encodeURIComponent("Oslo, Norge");

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <div className="room-card text-center" style={{ maxWidth: 900, margin: "0 auto" }}>
        {room.image && (
          <img
            src={room.image}
            alt={room.name}
            className="room-image"
            style={{ height: 500, objectFit: "cover" }}
          />
        )}

        <div className="room-content">
          <h1 className="room-title">{room.name}</h1>
          <p className="room-description">{room.description}</p>
          <p className="room-capacity">Kapasitet: {room.capacity} personer</p>
          <p className={`room-status ${room.available ? "available" : "busy"}`}>
            {room.available ? "Ledig" : "Opptatt"}
          </p>

          <a
            href="/rooms"
            className="room-button mt-4"
            style={{ background: "#1e3a8a" }}
          >
            ← Tilbake
          </a>
        </div>
      </div>

      <div
        style={{
          marginTop: "3rem",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <iframe
          title="Lokasjon"
          src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="400"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
