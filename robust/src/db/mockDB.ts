import room1 from "@/resources/room1.jpg";
import room2 from "@/resources/room2.jpg";
import room3 from "@/resources/room3.jpg";

export const rooms = [
  {
    id: 1,
    name: "Møterom Alpha",
    description: "Lyst og moderne møterom med plass til 6 personer.",
    capacity: 6,
    available: true,
    image: room1,
  },
  {
    id: 2,
    name: "Fellesområde Beta",
    description: "Et sosialt rom med fleksible sitteplasser og whiteboard.",
    capacity: 10,
    available: false,
    image: room2,
  },
  {
    id: 3,
    name: "Stillhetssone Gamma",
    description: "Rolig område perfekt for konsentrasjon og fokusert arbeid.",
    capacity: 4,
    available: true,
    image: room3,
  },
  {
    id: 4,
    name: "Teamrom Delta",
    description: "Et samarbeidsrom med stor skjerm og digital tavle.",
    capacity: 8,
    available: true,
    image: room1,
  },
  {
    id: 5,
    name: "Prosjektrom Epsilon",
    description: "Rom tilpasset gruppeprosjekter og workshops.",
    capacity: 12,
    available: false,
    image: room2,
  },
  {
    id: 6,
    name: "Kreativ Sone Zeta",
    description: "Inspirerende rom med tavler og fleksible sitteplasser.",
    capacity: 7,
    available: true,
    image: room3,
  },
];

export function getRoomById(id: number) {
  return rooms.find((room) => room.id === id);
}
