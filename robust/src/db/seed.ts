import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { rooms } from "./schema";

export default defineScript(async ({ env }) => {
  const db = drizzle(env.DB);

  // Tøm tabellen først (valgfritt, for å unngå duplikater)
  await db.run("DELETE FROM rooms");

  // Legg inn 20 rom
  const newRooms = Array.from({ length: 20 }, (_, i) => ({
    name: `Rom ${i + 1}`,
    description: `Dette er et testrom nummer ${i + 1}. Perfekt for møter og gruppearbeid.`,
    capacity: 2 + (i % 5) * 2, // 2–10 personer
  }));

  await db.insert(rooms).values(newRooms);

  const result = await db.select().from(rooms).all();

  console.log("🌱 Seeded rooms:", result.length);
  return Response.json(result);
});
