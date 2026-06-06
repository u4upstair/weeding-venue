"use client";

import { motion, type Variants } from "framer-motion";
import MatterportWrapper from "@/components/MatterportWrapper";
import EstateMap from "@/components/EstateMap";
import { galleryImages, venueHistory } from "@/constants/dummyData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const masonry = [
  { img: galleryImages.find((g) => g.id === "g-05"), span: "lg:row-span-2", pt: "" },
  { img: galleryImages.find((g) => g.id === "g-02"), span: "", pt: "lg:mt-24" },
  { img: galleryImages.find((g) => g.id === "g-06"), span: "lg:row-span-2", pt: "lg:mt-12" },
  { img: galleryImages.find((g) => g.id === "g-04"), span: "", pt: "" },
];

export default function EstatePage() {
  return (
    <>
      {/* ---------- Intro / heritage heading ---------- */}
      <section className="bg-alabaster pt-40 lg:pt-56">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-xs font-medium uppercase tracking-[0.28em] text-sage"
            >
              The Estate · Est. {venueHistory.established}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-heading text-5xl leading-[1.06] text-charcoal lg:text-7xl"
            >
              {venueHistory.heading}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl font-body text-lg font-light leading-relaxed text-charcoal/70"
            >
              {venueHistory.subheading}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ---------- Heritage: serif + staggered masonry ---------- */}
      <section className="bg-alabaster py-32 lg:py-48">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-heading text-4xl leading-tight text-charcoal lg:text-5xl">
              A Heritage
              <br />
              Preserved
            </h2>
            <div className="mt-10 space-y-6">
              {venueHistory.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-body text-base font-light leading-relaxed text-charcoal/70"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:col-span-7 lg:auto-rows-[220px] lg:gap-6">
            {masonry.map((cell, i) => (
              <motion.figure
                key={cell.img?.id ?? i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1.1,
                  delay: (i % 2) * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`overflow-hidden ${cell.span} ${cell.pt}`}
              >
                <img
                  src={cell.img?.src}
                  alt={cell.img?.alt ?? "Estate detail"}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Milestones ---------- */}
      <section className="border-y border-charcoal/10 bg-alabaster py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-8">
            {venueHistory.milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <p className="font-heading text-4xl text-charcoal lg:text-5xl">
                  {m.year}
                </p>
                <p className="mt-4 max-w-[14rem] font-body text-sm font-light leading-relaxed text-charcoal/60">
                  {m.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Virtual tour ---------- */}
      <section className="bg-alabaster py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12 max-w-2xl lg:mb-16">
            <p className="font-body text-xs font-medium uppercase tracking-[0.28em] text-sage">
              Virtual Tour
            </p>
            <h2 className="mt-5 font-heading text-4xl leading-tight text-charcoal lg:text-5xl">
              Walk the halls before you arrive.
            </h2>
          </div>
          <MatterportWrapper posterAlt="Candlelit gallery interior" />
        </div>
      </section>

      {/* ---------- Interactive map ---------- */}
      <section className="bg-alabaster pb-40 lg:pb-56">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14 max-w-2xl lg:mb-20">
            <p className="font-body text-xs font-medium uppercase tracking-[0.28em] text-sage">
              The Grounds
            </p>
            <h2 className="mt-5 font-heading text-4xl leading-tight text-charcoal lg:text-5xl">
              Four spaces, one estate.
            </h2>
          </div>
          <EstateMap />
        </div>
      </section>
    </>
  );
}
