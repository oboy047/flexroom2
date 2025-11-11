export default function Register() {
  return (
    <section className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Registrer deg</h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Fullt navn"
          className="border w-full p-2 rounded-lg"
        />
        <input
          type="email"
          placeholder="E-post"
          className="border w-full p-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Passord"
          className="border w-full p-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Bekreft passord"
          className="border w-full p-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Opprett konto
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Har du allerede en konto?{" "}
        <a
          href="/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Logg inn
        </a>
      </p>
    </section>
  );
}
