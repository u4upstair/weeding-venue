"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface FormData {
  date: string;
  guestCount: string;
  eventType: string;
  name: string;
  email: string;
  details: string;
}

const eventTypes = [
  "Wedding",
  "Private Event",
  "Corporate Gathering",
  "Other",
];

const guestBands = ["Under 60", "60–100", "100–140", "140–180", "180+"];

const steps = [
  { id: "date", title: "The Date", caption: "When do you imagine the day?" },
  { id: "guests", title: "The Gathering", caption: "How many will join you?" },
  { id: "type", title: "The Occasion", caption: "What are we celebrating?" },
  { id: "details", title: "The Details", caption: "Tell us how to reach you." },
] as const;

const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

const initial: FormData = {
  date: "",
  guestCount: "",
  eventType: "",
  name: "",
  email: "",
  details: "",
};

/**
 * Mock CRM push. In production this would POST to a server route that holds
 * the webhook secret — never expose the CRM endpoint to the client directly.
 */
async function pushToCRM(payload: FormData) {
  const body = {
    source: "maison-verdant.com/contact",
    submittedAt: new Date().toISOString(),
    lead: payload,
  };

  // Example: route through an internal API handler that proxies to the CRM.
  //   await fetch("/api/crm/lead", { method: "POST", body: JSON.stringify(body) });
  //
  // Illustrative direct webhook shape (HubSpot / Salesforce / Pipedrive):
  //   await fetch(process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL!, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   });

  await new Promise((r) => setTimeout(r, 1200)); // simulate latency
  // eslint-disable-next-line no-console
  console.info("[CRM webhook] lead captured →", body);
  return { ok: true };
}

export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (patch: Partial<FormData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const canAdvance = [
    Boolean(data.date),
    Boolean(data.guestCount),
    Boolean(data.eventType),
    Boolean(data.name && data.email),
  ][step];

  const submit = async () => {
    setStatus("sending");
    await pushToCRM(data);
    setStatus("done");
  };

  return (
    <div className="border border-charcoal/10 bg-white/40 p-8 backdrop-blur-sm lg:p-14">
      {/* Progress */}
      <div className="mb-12 flex items-center gap-3">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-3">
            <span
              className={`font-body text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${
                i === step ? "text-charcoal" : "text-charcoal/30"
              }`}
            >
              0{i + 1}
            </span>
            <span className="relative h-px flex-1 bg-charcoal/10">
              <motion.span
                className="absolute inset-y-0 left-0 bg-sage"
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <h3 className="font-heading text-4xl text-charcoal">Thank you.</h3>
            <p className="mx-auto mt-5 max-w-md font-body text-base font-light leading-relaxed text-charcoal/60">
              Your enquiry is with our concierge. We reply to every couple
              personally, typically within two business days.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={steps[step].id}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs font-medium uppercase tracking-[0.26em] text-sage">
              {steps[step].caption}
            </p>
            <h3 className="mt-4 font-heading text-3xl text-charcoal lg:text-4xl">
              {steps[step].title}
            </h3>

            <div className="mt-10">
              {/* Step 0 — date */}
              {step === 0 && (
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => set({ date: e.target.value })}
                  className="w-full border-b border-charcoal/20 bg-transparent pb-3 font-body text-lg text-charcoal outline-none transition-colors focus:border-charcoal"
                />
              )}

              {/* Step 1 — guests */}
              {step === 1 && (
                <div className="flex flex-wrap gap-3">
                  {guestBands.map((band) => (
                    <button
                      key={band}
                      type="button"
                      onClick={() => set({ guestCount: band })}
                      className={`rounded-full border px-5 py-2.5 font-body text-sm transition-colors duration-300 ${
                        data.guestCount === band
                          ? "border-charcoal bg-charcoal text-alabaster"
                          : "border-charcoal/20 text-charcoal/70 hover:border-charcoal/50"
                      }`}
                    >
                      {band}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 — type */}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-3">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => set({ eventType: type })}
                      className={`border px-5 py-5 text-left font-heading text-xl transition-colors duration-300 ${
                        data.eventType === type
                          ? "border-charcoal bg-charcoal text-alabaster"
                          : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3 — details */}
              {step === 3 && (
                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={data.name}
                    onChange={(e) => set({ name: e.target.value })}
                    className="w-full border-b border-charcoal/20 bg-transparent pb-3 font-body text-lg text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-charcoal"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={data.email}
                    onChange={(e) => set({ email: e.target.value })}
                    className="w-full border-b border-charcoal/20 bg-transparent pb-3 font-body text-lg text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-charcoal"
                  />
                  <textarea
                    rows={3}
                    placeholder="Anything you'd like us to know…"
                    value={data.details}
                    onChange={(e) => set({ details: e.target.value })}
                    className="w-full resize-none border-b border-charcoal/20 bg-transparent pb-3 font-body text-lg text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-charcoal"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      {status !== "done" && (
        <div className="mt-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(Math.max(0, step - 1))}
            disabled={step === 0}
            className="font-body text-xs font-medium uppercase tracking-[0.2em] text-charcoal/50 transition-colors hover:text-charcoal disabled:invisible"
          >
            ← Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => canAdvance && go(step + 1)}
              disabled={!canAdvance}
              className="rounded-full bg-charcoal px-8 py-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-alabaster transition-opacity duration-300 disabled:opacity-30"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!canAdvance || status === "sending"}
              className="rounded-full bg-charcoal px-8 py-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-alabaster transition-opacity duration-300 disabled:opacity-30"
            >
              {status === "sending" ? "Sending…" : "Submit Enquiry"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
