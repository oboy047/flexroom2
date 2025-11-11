import room1 from "@/resources/room1.jpg";
import room2 from "@/resources/room2.jpg";
import room3 from "@/resources/room3.jpg";


export default function RoomList() {
  const roomImages = [room1, room2, room3];

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

      <div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        style={{ alignItems: "stretch" }}
      >
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <img
              src={room.image}
              alt={room.name}
              className="room-image"
              loading="lazy"
            />

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
