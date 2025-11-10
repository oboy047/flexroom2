import { getRoomById } from "../../../db/mockDB";

type RoomDetailProps = {
  params: {
    id: string;
  };
};

export function RoomDetail({ params }: RoomDetailProps) {
  const room = getRoomById(Number(params.id));

  if (!room) {
    return <p className="p-6">Rom ikke funnet.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
      <p className="mb-4 text-gray-700">{room.description}</p>
      <p className="text-gray-600">Kapasitet: {room.capacity}</p>
      <p
        className={
          room.available ? "text-green-600 mt-2" : "text-red-600 mt-2"
        }
      >
        {room.available ? "Ledig" : "Opptatt"}
      </p>

      <a href="/rooms" className="text-blue-600 underline block mt-6">
        ← Tilbake til rom
      </a>
    </div>
  );
}
