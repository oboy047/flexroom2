export default function Login() {
  return (
    <section className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Logg inn</h1>
      <form className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Logg inn
        </button>
      </form>
    </section>
  );
}
