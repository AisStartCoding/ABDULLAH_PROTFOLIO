"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ensureCsrf, studioFetch } from "@/lib/studio-api";

export default function StudioLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("Abdullah");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ensureCsrf().catch(() => setError("Could not prepare secure login. Check the backend API URL."));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await studioFetch("/api/studio/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      router.push("/studio");
    } catch {
      setError("Invalid credentials or unavailable API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="glass-panel card-glow w-full max-w-md rounded-lg p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Private Studio</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Portfolio admin</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in as the portfolio owner to manage content.</p>

        <label className="mt-6 block text-sm font-medium text-slate-700">
          Username
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        {error ? <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
