import { rooms } from "@/db/mockDB";

export default function RoomList() {
  return (
    <main className="py-16 px-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">
        Våre møterom
      </h1>

      {/* GRID-layout for romkort */}
      <div
        className="room-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          alignItems: "stretch",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <img src={room.image} alt={room.name} className="room-image" />

            <div className="room-content">
              <h2 className="room-title">{room.name}</h2>
              <p className="room-description">{room.description}</p>
              <p className="room-capacity">
                Kapasitet: {room.capacity} personer
              </p>
              <p
                className={`room-status ${
                  room.available ? "available" : "busy"
                }`}
              >
                {room.available ? "Ledig" : "Opptatt"}
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
