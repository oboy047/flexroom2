export default function Home() {
  return (
    <main>
      
      <section className="bg-white text-center py-24 px-6 shadow-soft rounded-lg mt-10 mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          Velkommen til Flexroom
        </h1>
        <p className="text-gray text-lg mb-8 max-w-2xl mx-auto">
          Book fleksible møterom og arbeidsplasser på sekunder. 
          For bedrifter, studenter og kreative — alt samlet på ett sted.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/rooms" className="btn btn-primary">
            Utforsk rom
          </a>
          <a href="/login" className="btn btn-outline">
            Logg inn
          </a>
        </div>
      </section>

      
      <section className="container py-24 text-center">
        <h2 className="text-3xl font-semibold mb-4">Hvordan fungerer Flexroom?</h2>
        <p className="text-gray mb-12 max-w-2xl mx-auto">
          Finn ledige rom, reserver på nett, og få full oversikt over dine bookinger. 
          Enkelt, raskt og trygt – både for små team og store organisasjoner.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">1️⃣ Oppdag</h3>
            <p>Utforsk rom og lokasjoner tilpasset dine behov.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">2️⃣ Book</h3>
            <p>Reserver direkte fra appen — ingen e-post, ingen stress.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">3️⃣ Bruk</h3>
            <p>Møt opp, sjekk inn og start møtet. Alt håndteres automatisk.</p>
          </div>
        </div>
      </section>

      
      <section className="bg-gray py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-semibold mb-12">Hvorfor velge Flexroom?</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">⚡ Lynrask booking</h3>
              <p>Reserver møterom på sekunder via et intuitivt grensesnitt.</p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-2">🌍 Tilgjengelig overalt</h3>
              <p>Fungerer like godt på PC, mobil og nettbrett — uansett sted.</p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-2">🔒 Sikker innlogging</h3>
              <p>Dine data og bookinger er beskyttet med moderne sikkerhet.</p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-2">🤝 Teamtilgang</h3>
              <p>Del og administrer rom sammen med kolleger i sanntid.</p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-2">💬 Smart varsling</h3>
              <p>Få påminnelser og statusoppdateringer direkte i appen.</p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-2">📅 Full oversikt</h3>
              <p>Se alle dine bookinger og rom i en elegant kalenderoversikt.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="text-center py-24 bg-white shadow-soft rounded-lg mt-10 mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">Klar til å komme i gang?</h2>
        <p className="text-gray mb-8">
          Bli en del av fremtidens møteopplevelse – helt gratis.
        </p>
        <a href="/rooms" className="btn btn-primary text-lg px-8 py-3">
          Utforsk nå
        </a>
      </section>
    </main>
  );
}
