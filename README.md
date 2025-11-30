Flexroom er en webapplikasjon bygget i React (via Robust/Cloudflare Workers) med Appwrite som backend.  
Den lar brukere se møterom, vise detaljer og booke rom.

Dette prosjektet er laget som en del av et skoleprosjekt.

for å kjøre web-appen gjøre følgende:

1.
lag en .env fil i rot mappa og lim inn dette :
VITE_APPWRITE_PROJECT_ID="692ad4fa0019ab7b9415"
VITE_APPWRITE_PROJECT_NAME="FR2"
VITE_APPWRITE_ENDPOINT="https://fra.cloud.appwrite.io/v1"

VITE_APPWRITE_DB_ID="692ad6f8000ffa9f236a"
VITE_APPWRITE_ROOMS_COLLECTION_ID="rooms-id-123"
VITE_ADMIN_EMAIL="admin2@mail.com"
VITE_APPWRITE_BOOKINGS_COLLECTION_ID="bookings-123"




2.
pnpm install

3.
pnpm dev
