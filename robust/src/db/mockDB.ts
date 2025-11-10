// En enkel "fake" database i minnet

export type Room = {
  id: number;
  name: string;
  description: string;
  capacity: number;
  available: boolean;
};

// Startdata (du kan endre eller legge til flere)
let rooms: Room[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `Rom ${i + 1}`,
  description: `Dette er et testrom nummer ${i + 1}. Perfekt for møter og gruppearbeid.`,
  capacity: 2 + (i % 5) * 2,
  available: i % 2 === 0,
}));

// Hent alle rom
export function getRooms() {
  return rooms;
}

// Hent ett rom
export function getRoomById(id: number) {
  return rooms.find((room) => room.id === id);
}

// Legg til et nytt rom (Admin-funksjon)
export function addRoom(newRoom: Omit<Room, "id">) {
  const id = rooms.length + 1;
  const room = { id, ...newRoom };
  rooms.push(room);
  return room;
}

// Fjern et rom
export function deleteRoom(id: number) {
  rooms = rooms.filter((room) => room.id !== id);
}
