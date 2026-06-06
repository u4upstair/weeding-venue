"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { venueHistory } from "@/constants/dummyData";

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.45 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  SECTION 1 — Hero                                                   */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen min-h-[680px] items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
          alt="The estate ceremony arch framed by soft afternoon light"
          className="h-full w-full object-cover"
        />
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/25 to-charcoal/70" />
        <div className="absolute inset-0 bg-charcoal/10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-5xl px-8 text-center lg:px-12"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUpSmall}
            className="font-body text-xs font-medium uppercase tracking-[0.42em] text-alabaster/70"
          >
            Sonoma Valley · Est. {venueHistory.established}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-10 max-w-4xl font-heading text-5xl font-normal leading-[1.05] text-alabaster sm:text-6xl lg:text-8xl"
          >
            A Century of
            <br />
            Quiet Grandeur
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-xl font-body text-base font-light leading-relaxed text-alabaster/80 lg:text-lg"
          >
            {venueHistory.subheading}
          </motion.p>

          <motion.div variants={fadeUpSmall} className="mt-14">
            <Link
              href="/book-a-tour"
              className="inline-flex items-center gap-4 border-b border-alabaster/40 pb-2 font-body text-xs font-medium uppercase tracking-[0.26em] text-alabaster transition-colors duration-500 hover:border-alabaster"
            >
              Book a Private Tour
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-alabaster/60">
          Scroll to Explore
        </span>
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-12 w-px bg-alabaster/50"
        />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2 — Philosophy                                             */
/* ------------------------------------------------------------------ */

function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const clusterY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="bg-alabaster px-8 py-32 sm:px-12 lg:px-24 lg:py-48"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
        {/* Left — sticky statement */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-xs font-medium uppercase tracking-[0.32em] text-sage"
            >
              Our Philosophy
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-heading text-4xl font-normal leading-[1.1] text-charcoal lg:text-6xl"
            >
              Beauty is best
              <br />
              when it is
              <br />
              <span className="italic text-sage">unforced.</span>
            </motion.h2>
          </div>
        </div>

        {/* Right — editorial text + masonry cluster */}
        <div className="lg:col-span-7">
          <div className="max-w-xl space-y-7">
            {venueHistory.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.95,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-body text-base font-light leading-relaxed text-charcoal/70 lg:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Masonry image cluster */}
          <motion.div
            style={{ y: clusterY }}
            className="mt-20 grid grid-cols-2 gap-6 lg:gap-8"
          >
            <motion.figure
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop"
                alt="The estate facade at golden hour"
                className="h-full w-full object-cover"
              />
            </motion.figure>

            <motion.figure
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1.1,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-16 aspect-[3/4] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1525258946800-98cfd641d0de?q=80&w=1000&auto=format&fit=crop"
                alt="Reflecting pool bordered by sage and olive"
                className="h-full w-full object-cover"
              />
            </motion.figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 3 — Pathways                                               */
/* ------------------------------------------------------------------ */

const pathways = [
  {
    title: "Weddings",
    href: "/weddings",
    description: "One celebration per weekend. The estate, entirely yours.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop",
    alt: "Long reception table set beneath the olive terrace",
  },
  {
    title: "Private Events",
    href: "/private-events",
    description: "Anniversaries, dinners, and gatherings of quiet occasion.",
    image:
      "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?q=80&w=1400&auto=format&fit=crop",
    alt: "Candlelit evening reception in the gallery",
  },
];

function PathwayCard({ title, href, description, image, alt }: (typeof pathways)[number]) {
  return (
    <Link href={href} className="group relative block h-[70vh] min-h-[520px] overflow-hidden">
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img src={image} alt={alt} className="h-full w-full object-cover" />
      </motion.div>

      {/* Scrim */}
      <div className="absolute inset-0 bg-charcoal/30 transition-colors duration-700 group-hover:bg-charcoal/45" />

      {/* Title block */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-12 text-center">
        <h3 className="font-heading text-4xl font-normal text-alabaster lg:text-5xl">
          {title}
        </h3>
        <p className="mt-4 max-w-xs font-body text-sm font-light leading-relaxed text-alabaster/80">
          {description}
        </p>
      </div>

      {/* Centered "Discover" reveal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="translate-y-3 rounded-full border border-alabaster/60 bg-alabaster/10 px-10 py-4 font-body text-xs font-medium uppercase tracking-[0.26em] text-alabaster opacity-0 backdrop-blur-md transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          Discover
        </span>
      </div>
    </Link>
  );
}

function Pathways() {
  return (
    <section className="bg-alabaster pb-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {pathways.map((pathway, i) => (
          <motion.div
            key={pathway.title}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 1.1,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <PathwayCard {...pathway} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 4 — Social proof                                           */
/* ------------------------------------------------------------------ */

const publications = [
  "Vogue",
  "Architectural Digest",
  "The Knot",
  "Harper's Bazaar",
  "Brides",
  "Martha Stewart",
];

function SocialProof() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-charcoal/10 bg-alabaster px-8 py-24 sm:px-12 lg:px-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-body text-[10px] font-medium uppercase tracking-[0.36em] text-charcoal/35">
          Featured In
        </p>
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {publications.map((name) => (
            <li
              key={name}
              className="font-heading text-xl text-charcoal/35 grayscale transition-colors duration-500 hover:text-charcoal/65 lg:text-2xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Pathways />
      <SocialProof />
    </>
  );
}
