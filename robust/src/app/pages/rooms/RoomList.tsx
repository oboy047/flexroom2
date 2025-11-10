import { getRooms } from "../../../db/mockDB";

export default function RoomList() {
  const rooms = getRooms();

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Tilgjengelige rom
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{room.name}</h2>
            <p className="text-sm text-gray-600">
              Kapasitet: {room.capacity} personer
            </p>
            <p className={room.available ? "text-green-600" : "text-red-600"}>
              {room.available ? "Ledig" : "Opptatt"}
            </p>

            <a
              href={`/rooms/${room.id}`}
              className="block bg-blue-600 text-white mt-3 py-2 rounded text-center hover:bg-blue-700"
            >
              Se detaljer
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
