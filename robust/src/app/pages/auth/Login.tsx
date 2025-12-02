"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      window.location.href = "/admin";
    } catch (err: any) {
      setError(err?.message || "Innlogging feilet.");
    }
  }

  return (
    <section className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Logg inn</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="E-post"
          className="border w-full p-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Passord"
          className="border w-full p-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Logg inn
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Har du ikke en konto?{" "}
        <a
          href="/register"
          className="text-blue-600 font-medium hover:underline"
        >
          Registrer deg
        </a>
      </p>
    </section>
  );
}
