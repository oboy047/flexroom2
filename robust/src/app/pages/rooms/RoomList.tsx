export default function RoomList() {
  // 🖼️ Liste over fine møteromsbilder
  const roomImages = [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590608897129-79da98d1592a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616627458704-7f3a1f0401dc?auto=format&fit=crop&w=800&q=80",
  ];

  // 💾 Mock data (du kan koble DB senere)
  const rooms = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Møterom ${i + 1}`,
    capacity: 4 + (i % 6),
    available: i % 3 !== 0,
    image: roomImages[i % roomImages.length],
    description:
      i % 2 === 0
        ? "Et lyst møterom med moderne utstyr og god plass til samarbeid."
        : "Et stille og komfortabelt rom for fokusert arbeid og mindre møter.",
  }));

  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Våre møterom
      </h1>

      {/* 🧱 Grid layout */}
      <div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        style={{ alignItems: "stretch" }}
      >
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            {/* 📸 Bilde */}
            <img
              src={room.image}
              alt={room.name}
              className="room-image"
              loading="lazy"
            />

            {/* 🧾 Info */}
            <div className="room-content">
              <h2 className="room-title">{room.name}</h2>
              <p className="room-description">{room.description}</p>
              <p className="room-capacity">Kapasitet: {room.capacity} personer</p>
              <p
                className={
                  room.available ? "room-status available" : "room-status busy"
                }
              >
                {room.available ? "Ledig nå" : "Opptatt"}
              </p>

              <a href={`/rooms/${room.id}`} className="room-button">
                Se detaljer
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
