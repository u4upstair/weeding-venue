"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientPortalPage() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock gate — replace with real session auth (NextAuth / server action).
    if (email && code.trim().toUpperCase() === "VERDANT") {
      setError(false);
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal px-6 py-32">
      {/* Branded backdrop */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=80"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      <AnimatePresence mode="wait">
        {!authed ? (
          /* ---------- Login gate ---------- */
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md border border-alabaster/15 bg-alabaster/5 p-10 backdrop-blur-xl lg:p-14"
          >
            <p className="text-center font-body text-[11px] font-medium uppercase tracking-[0.3em] text-alabaster/60">
              Maison Verdant
            </p>
            <h1 className="mt-5 text-center font-heading text-4xl text-alabaster">
              Concierge Portal
            </h1>
            <p className="mx-auto mt-4 max-w-xs text-center font-body text-sm font-light leading-relaxed text-alabaster/60">
              For couples with a reserved date. Access your planning suite,
              documents, and timeline.
            </p>

            <form onSubmit={handleLogin} className="mt-12 space-y-7">
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-alabaster/25 bg-transparent pb-3 font-body text-base text-alabaster outline-none transition-colors placeholder:text-alabaster/40 focus:border-alabaster"
              />
              <input
                type="password"
                required
                placeholder="Access code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border-b border-alabaster/25 bg-transparent pb-3 font-body text-base text-alabaster outline-none transition-colors placeholder:text-alabaster/40 focus:border-alabaster"
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-body text-xs uppercase tracking-[0.16em] text-sage"
                  >
                    Those credentials weren&apos;t recognised. Try again.
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full rounded-full bg-alabaster py-3.5 font-body text-xs font-medium uppercase tracking-[0.22em] text-charcoal transition-opacity duration-300 hover:opacity-90"
              >
                Enter Portal
              </button>
            </form>

            <p className="mt-8 text-center font-body text-xs text-alabaster/40">
              Misplaced your code? Contact your planner directly.
            </p>
          </motion.div>
        ) : (
          /* ---------- Dashboard shell (gated) ---------- */
          <motion.div
            key="dash"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl border border-alabaster/15 bg-alabaster/5 p-10 backdrop-blur-xl lg:p-14"
          >
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-alabaster/60">
              Welcome back
            </p>
            <h1 className="mt-4 font-heading text-4xl text-alabaster">
              Your Planning Suite
            </h1>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {["Timeline", "Documents", "Guest List"].map((tile) => (
                <div
                  key={tile}
                  className="border border-alabaster/15 p-6 transition-colors hover:bg-alabaster/5"
                >
                  <h2 className="font-heading text-2xl text-alabaster">
                    {tile}
                  </h2>
                  <p className="mt-3 font-body text-xs uppercase tracking-[0.16em] text-alabaster/40">
                    View
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAuthed(false)}
              className="mt-12 font-body text-xs font-medium uppercase tracking-[0.2em] text-alabaster/50 transition-colors hover:text-alabaster"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
