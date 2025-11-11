import { getRoomById } from "@/db/mockDB";

type RoomDetailProps = {
  params: {
    id: string;
  };
};

export function RoomDetail({ params }: RoomDetailProps) {
  const room = getRoomById(Number(params.id));

  if (!room) {
    return <p className="p-6 text-center text-gray-600">Rom ikke funnet.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      <div className="room-card 500px text-center">
        <img
          src={room.image}
          alt={room.name}
          className="room-image"
          style={{ height: "800px", objectFit: "cover" }}
        />

        <div className="room-content">
          <h1 className="room-title">{room.name}</h1>
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

          <div className="flex justify-between mt-4">
            <a href="/rooms" className="room-button" style={{ background: "#1e3a8a" }}>
              ← Tilbake
            </a>
            <button
              disabled={!room.available}
              className={`room-button ${
                !room.available ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
              }`}
            >
              Book rom
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
