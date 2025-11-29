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
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9983.670396304258!2d10.73897075!3d59.91386825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e61f04a06a3%3A0xf68e381dfd2c04d9!2sOslo!5e0!3m2!1sen!2sno!4v1700000000000"
      />
      </div>
    </section>
  );
}
