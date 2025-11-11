"use client";

import React, { useState } from "react";
import { getRoomById } from "@/db/mockDB";


type RoomDetailProps = {
  params: {
    id: string;
  };
};

export function RoomDetail({ params }: RoomDetailProps) {
  const room = getRoomById(Number(params.id));
  const [selectedDate, setSelectedDate] = useState<string>("");

  if (!room) {
    return <p className="p-6 text-center text-gray-600">Rom ikke funnet.</p>;
  }

  // 🎯 Dummy-adresse for kartet (du kan endre til noe ekte)
  const mapQuery = encodeURIComponent("Oslo, Norge");

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      {/* 🖼️ Bilde */}
      <div className="room-card text-center" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <img
          src={room.image}
          alt={room.name}
          className="room-image"
          style={{ height: "500px", objectFit: "cover" }}
        />

        <div className="room-content">
          <h1 className="room-title">{room.name}</h1>
          <p className="room-description">{room.description}</p>
          <p className="room-capacity">
            Kapasitet: {room.capacity} personer
          </p>
          <p
            className={`room-status ${room.available ? "available" : "busy"}`}
          >
            {room.available ? "Ledig" : "Opptatt"}
          </p>

          {/* 🗓️ Bookingdato */}
          <div style={{ margin: "1rem 0" }}>
            <label
              htmlFor="bookingDate"
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
            >
              Velg dato for booking:
            </label>
            <input
              id="bookingDate"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-sm"
              style={{ minWidth: "200px" }}
            />
          </div>

          {/* 🔘 Knapper */}
          <div className="flex justify-between mt-4">
            <a
              href="/rooms"
              className="room-button"
              style={{ background: "#1e3a8a" }}
            >
              ← Tilbake
            </a>

            <button
              disabled={!room.available || !selectedDate}
              className={`room-button ${
                !room.available || !selectedDate
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : ""
              }`}
            >
              {selectedDate
                ? `Book rom (${new Date(selectedDate).toLocaleDateString("no-NO")})`
                : "Book rom"}
            </button>
          </div>
        </div>
      </div>

      {/* 🗺️ Google Maps */}
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
          src="https://maps.google.com/maps?q=Oslo,Norge&t=&z=13&ie=UTF8&iwloc=&output=embed"

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
