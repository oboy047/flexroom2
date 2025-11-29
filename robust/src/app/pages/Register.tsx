"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passordene matcher ikke");
      return;
    }

    try {
      await register(email, password, name);
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "Kunne ikke opprette konto.");
    }
  }

  return (
    <section className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Registrer deg</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <input
          type="text"
          placeholder="Fullt navn"
          className="border w-full p-2 rounded-lg"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-post"
          className="border w-full p-2 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Passord"
          className="border w-full p-2 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Bekreft passord"
          className="border w-full p-2 rounded-lg"
          onChange={(e) => setConfirm(e.target.value)}
          required
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
