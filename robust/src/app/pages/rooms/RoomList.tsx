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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  {
    /* Filter States, for backend */
  }
  const [searchText, setSearchText] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [roomAvailable, setRoomAvailable] = useState(false);

  const extractLocation = (roomName: string): string => {
    const locations = [
      "Oslo",
      "Bergen",
      "Trondheim",
      "Stavanger",
      "Kristiansand",
      "Tromsø",
      "Bodø",
      "Ålesund",
      "Drammen",
      "Frederikstad",
      "Halden",
    ];

    for (const loc of locations) {
      if (roomName.includes(loc)) {
        return loc;
      }
    }
    return "";
  };

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
          location: doc.location ?? "",
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

  const filteredRooms = rooms.filter((room) => {
    if (
      searchText &&
      !room.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }

    if (selectedCapacity) {
      const capacity = parseInt(selectedCapacity);
      if (capacity === 50) {
        if (room.capacity < 50) return false;
      } else {
        if (room.capacity < capacity) return false;
      }
    }

    if (selectedLocation) {
      const roomLocation = extractLocation(room.name);
      if (roomLocation !== selectedLocation) {
        return false;
      }
    }

    if (roomAvailable && !room.available) {
      return false;
    }

    return true;
  });

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
      <h1 className="roomlist-heading text-center">Rom</h1>

      <div className="dropdown-wrapper-fullwidth">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="dropdown-button-fullwidth"
        >
          🔍 Søk etter rom
          <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
            ▼
          </span>
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu-fullwidth">
            <div className="dropdown-content-fullwidth">
              <div className="dropdown-item-fullwidth">
                <label className="dropdown-label">Romnavn:</label>
                <input
                  type="text"
                  placeholder="Søk etter romnavn..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="dropdown-input-fullwidth"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="dropdown-item-fullwidth">
                  <label className="dropdown-label">Kapasitet:</label>
                  <select
                    value={selectedCapacity}
                    onChange={(e) => setSelectedCapacity(e.target.value)}
                    className="dropdown-input-fullwidth"
                  >
                    <option value="">Velg kapasitet</option>
                    <option value="1">1 person</option>
                    <option value="5">5 personer</option>
                    <option value="10">10 personer</option>
                    <option value="20">20 personer</option>
                    <option value="50">50+ personer</option>
                  </select>
                </div>

                <div className="dropdown-item-fullwidth">
                  <label className="dropdown-label">Område:</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="dropdown-input-fullwidth"
                  >
                    <option value="">Velg Område</option>
                    <option value="Oslo">Oslo</option>
                    <option value="Bergen">Bergen</option>
                    <option value="Trondheim">Trondheim</option>
                    <option value="Stavanger">Stavanger</option>
                    <option value="Kristiansand">Kristiansand</option>
                    <option value="Tromsø">Tromsø</option>
                    <option value="Bodø">Bodø</option>
                    <option value="Ålesund">Ålesund</option>
                    <option value="Drammen">Drammen</option>
                    <option value="Frederikstad">Frederikstad</option>
                    <option value="Halden">Halden</option>
                  </select>
                </div>
                <div className="dropdown-item-fullwidth">
                  <label> </label>
                  {/* For Mellomrom */}
                  <label className="dropdown-label">
                    <input
                      type="checkbox"
                      checked={roomAvailable}
                      onChange={() => setRoomAvailable(!roomAvailable)}
                      className="mr-2"
                    />
                    Vis kun ledige rom
                  </label>
                </div>
              </div>

              <button
                onClick={() => setIsDropdownOpen(false)}
                className="btn btn-primary mt-4"
              >
                Lukk
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-gray-600 my-4">
        Viser {filteredRooms.length} av {rooms.length} rom
      </p>

      <div className="roomlist-grid">
        {filteredRooms.map((room) => (
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

              {extractLocation(room.name) && (
                <p className="text-sm text-gray-600">
                  📍 {extractLocation(room.name)}
                </p>
              )}

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
