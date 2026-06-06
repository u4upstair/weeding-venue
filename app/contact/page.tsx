import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import IntakeForm from "@/components/IntakeForm";

export const metadata: Metadata = {
  title: "Enquire — Maison Verdant",
  description:
    "Begin the conversation. Share your date, your gathering, and your vision — our concierge replies to every couple personally.",
};

export default function ContactPage() {
  return (
    <section className="bg-alabaster pb-40 pt-40 lg:pb-56 lg:pt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="font-body text-xs font-medium uppercase tracking-[0.28em] text-sage">
            Enquire
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-tight text-charcoal lg:text-6xl">
            Begin the conversation.
          </h1>
          <p className="mt-8 max-w-xl font-body text-lg font-light leading-relaxed text-charcoal/70">
            A handful of questions to understand your day. Everything else, we
            prefer to discuss in person.
          </p>
        </div>

        <div className="mt-20 grid gap-20 lg:mt-28 lg:grid-cols-12 lg:gap-24">
          {/* FAQ */}
          <div className="lg:col-span-5">
            <h2 className="mb-10 font-body text-xs font-medium uppercase tracking-[0.22em] text-charcoal/40">
              Before you ask
            </h2>
            <FaqAccordion />
          </div>

          {/* Intake */}
          <div className="lg:col-span-7">
            <IntakeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
