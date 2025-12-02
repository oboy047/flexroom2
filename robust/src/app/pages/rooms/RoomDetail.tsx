"use client";

import React, { useEffect, useState } from "react";
import { getRoomById } from "@/db/rooms";
import { createBooking } from "@/db/bookings";
import { useAuth } from "@/hooks/useAuth";

type RoomDetailProps = {
  params: { id: string };
};

export function RoomDetail({ params }: RoomDetailProps) {
  const [room, setRoom] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await getRoomById(params.id);
      setRoom(data);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <p className="p-6 text-center text-gray-600">Laster rom...</p>;
  if (!room) return <p className="p-6 text-center text-gray-600">Rom ikke funnet.</p>;

  async function handleBooking() {
    if (!user) {
      setMessage("Du må være logget inn for å booke rom.");
      return;
    }

    if (!selectedDate) {
      setMessage("Velg en dato for å booke.");
      return;
    }

      try {
    setMessage("Behandler booking...");
    
    await createBooking(room.$id, user.$id, selectedDate);
    
    setMessage("Booking vellykket! Omdirigerer til betaling...");
    
    // Wait a moment so user sees the success message
    setTimeout(() => {
      window.location.href = `/rooms/${params.id}/payment`;
    }, 1500);
    
  } 
    catch (err) {
      console.error(err);
      setMessage("Kunne ikke utføre booking.");
    }
  }

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <div className="text-center">
        <img
          src={room.image}
          alt={room.name}
          className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          style={{ maxHeight: "450px", objectFit: "cover" }}
        />

        <h1 className="text-3xl mt-6 font-bold">{room.name}</h1>
        <p className="mt-3 text-gray-700">{room.description}</p>

        <p className="mt-2 font-medium">
          Kapasitet: {room.capacity} personer
        </p>

        <p className={`mt-2 font-bold ${room.available ? "text-green-600" : "text-red-600"}`}>
          {room.available ? "Ledig" : "Opptatt"}
        </p>

        {message && (
          <p className="mt-4 text-blue-700 font-semibold">{message}</p>
        )}


        {/* Date Picker */}
          <div className="mt-6 flex justify-center w-full">
            <div className="flex flex-col items-center">
              <label className="mb-2 font-medium">Velg dato for booking:</label>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border p-2 rounded w-48 inline-block text-center"
                style={{ maxWidth: "200px" }}
              />
            </div>
          </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Book rom
        </button>

        {/* Tilbake */}
        <div className="mt-8">
          <a href="/rooms" className="text-blue-600 hover:underline text-lg">
            ← Tilbake til rom
          </a>
        </div>
      </div>
    </section>
  );
}
