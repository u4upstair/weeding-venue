"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { venueHistory, featuredPublications } from "@/constants/dummyData";

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
/*  SECTION 1.5 — The Estate (heritage story)                          */
/* ------------------------------------------------------------------ */

const estateImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
    alt: "The grand stone manor and its colonnaded facade at golden hour",
  },
  grounds: {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    alt: "A sunlit, tree-lined avenue leading through the estate grounds",
  },
  gardens: {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop",
    alt: "The formal gardens and manicured lawns unfolding across the estate",
  },
} as const;

const estateParagraphs = [
  "Commissioned in 1894 and laid stone by stone over seven unhurried years, the estate was conceived not as a monument but as a sanctuary — a place where time slows and beauty is allowed to arrive on its own.",
  "Its limestone galleries, vaulted conservatory, and colonnaded terrace remain as they were drawn over a century ago, weathered now to the soft patina that only age can give. Architecture here is not a backdrop; it is the quiet host.",
  "Beyond the house, two hundred and twenty acres unfold in deliberate sequence — formal gardens giving way to the vineyard, the vineyard to the open ceremony lawn, where the valley falls away toward the hills.",
  "It is a destination in the truest sense: a world apart, reserved for a single celebration at a time, where couples and their guests arrive as visitors and leave having belonged.",
];

function Estate() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const heroParallax = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const groundsParallax = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const gardensParallax = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <section
      ref={ref}
      className="bg-alabaster px-8 py-[180px] sm:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Editorial header — asymmetrical two columns */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Left — large editorial typography */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-xs font-medium uppercase tracking-[0.42em] text-sage"
            >
              The Estate
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-heading text-5xl font-normal leading-[1.04] text-charcoal sm:text-6xl lg:text-7xl"
            >
              A Legacy
              <br />
              of <span className="italic text-sage">Elegance</span>
              <br />
              Since 1894
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 h-px w-24 origin-left bg-charcoal/20"
            />
          </div>

          {/* Right — luxury storytelling copy */}
          <div className="lg:col-span-6 lg:pt-4">
            <div className="max-w-xl space-y-7">
              {estateParagraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-body text-base font-light leading-relaxed text-charcoal/65 lg:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial image composition */}
        <div className="mt-28 grid grid-cols-1 gap-8 lg:mt-40 lg:grid-cols-12 lg:gap-10">
          {/* Large hero estate image */}
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover="hover"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:col-span-8 lg:aspect-auto lg:h-[640px]"
          >
            <motion.img
              style={{ y: heroParallax }}
              variants={{ hover: { scale: 1.05 } }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              src={estateImages.hero.src}
              alt={estateImages.hero.alt}
              className="absolute inset-0 h-[112%] w-full object-cover"
            />
          </motion.figure>

          {/* Two supporting images, balanced to the hero's full height */}
          <div className="flex flex-col gap-8 lg:col-span-4 lg:h-[640px] lg:gap-10">
            <motion.figure
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:flex-1"
            >
              <motion.img
                style={{ y: groundsParallax }}
                variants={{ hover: { scale: 1.03, filter: "brightness(1.06)" } }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                src={estateImages.grounds.src}
                alt={estateImages.grounds.alt}
                className="absolute inset-0 h-[112%] w-full object-cover"
              />
            </motion.figure>

            <motion.figure
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:flex-1"
            >
              <motion.img
                style={{ y: gardensParallax }}
                variants={{ hover: { scale: 1.03, filter: "brightness(1.06)" } }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                src={estateImages.gardens.src}
                alt={estateImages.gardens.alt}
                className="absolute inset-0 h-[112%] w-full object-cover"
              />
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2.5 — Featured In (editorial trust)                        */
/* ------------------------------------------------------------------ */

const publicationStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const publicationItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeaturedIn() {
  return (
    <section className="bg-alabaster px-8 py-[180px] sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-xs font-medium uppercase tracking-[0.42em] text-sage"
          >
            Featured In
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 font-heading text-4xl font-normal leading-[1.12] text-charcoal sm:text-5xl lg:text-6xl"
          >
            Recognized by the industry&rsquo;s
            <br className="hidden sm:block" /> most{" "}
            <span className="italic text-sage">respected</span> publications
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 max-w-xl font-body text-base font-light leading-relaxed text-charcoal/60 lg:text-lg"
          >
            For a century, Maison Verdant has been quietly entrusted with the
            most meaningful of occasions. The editors who shape this world have
            taken notice — naming the estate among the finest addresses for those
            who measure luxury in restraint rather than spectacle.
          </motion.p>
        </div>

        {/* Divider above */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-24 h-px w-full max-w-5xl origin-center bg-charcoal/15"
        />

        {/* Publication showcase */}
        <motion.ul
          variants={publicationStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 divide-y divide-charcoal/10 md:grid-cols-2 md:divide-y-0 lg:grid-cols-5 lg:divide-x lg:divide-y-0 lg:divide-charcoal/10"
        >
          {featuredPublications.map((publication) => (
            <motion.li
              key={publication.name}
              variants={publicationItem}
              className="group px-6 py-16 text-center lg:py-20"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full cursor-default flex-col items-center"
              >
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.34em] text-charcoal/30 transition-colors duration-500 group-hover:text-sage">
                  {publication.context}
                </span>

                <h3 className="mt-6 font-heading text-2xl font-normal leading-tight text-charcoal/45 transition-colors duration-700 group-hover:text-charcoal lg:text-[1.7rem]">
                  {publication.name}
                </h3>

                <span className="mt-6 block h-px w-8 bg-charcoal/15 transition-all duration-700 group-hover:w-14 group-hover:bg-sage" />

                <p className="mt-7 max-w-[16rem] font-body text-sm font-light italic leading-relaxed text-charcoal/45 opacity-70 transition-all duration-700 group-hover:text-charcoal/70 group-hover:opacity-100">
                  &ldquo;{publication.quote}&rdquo;
                </p>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Divider below */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto h-px w-full max-w-5xl origin-center bg-charcoal/15"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2.75 — Signature Spaces (interactive estate explorer)      */
/* ------------------------------------------------------------------ */

const signatureSpaces = [
  {
    name: "Grand Ballroom",
    index: "01",
    tagline: "Restored 1924 limestone, lit by original chandeliers",
    description:
      "Beneath hand-painted ceilings and the estate's original crystal, the ballroom holds a seated dinner of one hundred and eighty with room still to dance until the candles burn low.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop",
    alt: "The restored limestone ballroom with vaulted ceilings and chandeliers",
  },
  {
    name: "Ceremony Lawn",
    index: "02",
    tagline: "An open green where the valley falls away",
    description:
      "Framed by century-old oaks and the hills beyond, the lawn receives the afternoon light in full. Vows are exchanged here against an unbroken horizon, with nothing between you and the valley.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
    alt: "An open landscaped ceremony lawn bordered by mature oaks",
  },
  {
    name: "Bridal Suite",
    index: "03",
    tagline: "A private wing for the morning's quiet hours",
    description:
      "A serene suite of soft northern light, antique dressing mirrors, and a terrace overlooking the gardens — a place to gather, prepare, and breathe before the day unfolds.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2000&auto=format&fit=crop",
    alt: "An elegant, light-filled private bridal preparation suite",
  },
  {
    name: "Vineyard Terrace",
    index: "04",
    tagline: "Long evenings above the estate's own vines",
    description:
      "An elevated stone terrace set among the rows, where dinner is served as the sun lowers over the valley and the vineyard turns from green to gold. Reserved for the slow, late hours.",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2000&auto=format&fit=crop",
    alt: "A stone terrace overlooking the estate's vineyard at dusk",
  },
];

function SignatureSpaces() {
  const [active, setActive] = useState(0);
  const space = signatureSpaces[active];

  const frameRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const offsetX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-18, 18]), {
    stiffness: 60,
    damping: 20,
  });
  const offsetY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-18, 18]), {
    stiffness: 60,
    damping: 20,
  });

  function handlePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = frameRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="bg-alabaster px-8 py-[180px] sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-body text-xs font-medium uppercase tracking-[0.42em] text-sage">
            Signature Spaces
          </p>
          <h2 className="mt-9 font-heading text-4xl font-normal leading-[1.08] text-charcoal sm:text-5xl lg:text-6xl">
            Every Celebration
            <br />
            Finds Its <span className="italic text-sage">Place</span>
          </h2>
          <p className="mt-10 max-w-xl font-body text-base font-light leading-relaxed text-charcoal/60 lg:text-lg">
            Four rooms, each with its own light and its own hour of the day.
            From the limestone ballroom to the open lawn and the vineyard above,
            the estate offers a setting for every part of the celebration.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-px w-full origin-left bg-charcoal/15"
        />

        {/* Interactive explorer — desktop */}
        <div className="mt-20 hidden grid-cols-12 gap-16 lg:grid">
          {/* Left — navigation */}
          <nav className="col-span-5 flex flex-col justify-center">
            <ul>
              {signatureSpaces.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.name} className="border-b border-charcoal/10">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className="group flex w-full items-baseline gap-6 py-7 text-left"
                    >
                      <span
                        className={`font-body text-xs font-medium tracking-[0.3em] transition-colors duration-500 ${
                          isActive ? "text-sage" : "text-charcoal/30"
                        }`}
                      >
                        {item.index}
                      </span>
                      <span className="relative">
                        <span
                          className={`font-heading text-3xl font-normal transition-colors duration-500 lg:text-4xl ${
                            isActive ? "text-charcoal" : "text-charcoal/40"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span
                          className={`absolute -bottom-1 left-0 h-px origin-left bg-sage transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive ? "w-full scale-x-100" : "w-full scale-x-0"
                          }`}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right — visual experience */}
          <div className="col-span-7">
            <div
              ref={frameRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              className="relative aspect-[4/5] w-full overflow-hidden"
            >
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <motion.img
                    style={{ x: offsetX, y: offsetY }}
                    src={space.image}
                    alt={space.alt}
                    className="absolute inset-[-6%] h-[112%] w-[112%] object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dynamic description */}
            <div className="relative mt-10 min-h-[150px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-body text-xs font-medium uppercase tracking-[0.34em] text-sage">
                    {space.tagline}
                  </p>
                  <p className="mt-5 max-w-xl font-body text-base font-light leading-relaxed text-charcoal/65 lg:text-lg">
                    {space.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stacked immersive panels — mobile & tablet */}
        <div className="mt-16 flex flex-col gap-24 lg:hidden">
          {signatureSpaces.map((item) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-7 flex items-baseline gap-5">
                <span className="font-body text-xs font-medium tracking-[0.3em] text-sage">
                  {item.index}
                </span>
                <h3 className="font-heading text-3xl font-normal text-charcoal">
                  {item.name}
                </h3>
              </div>
              <p className="mt-5 font-body text-xs font-medium uppercase tracking-[0.34em] text-sage/80">
                {item.tagline}
              </p>
              <p className="mt-4 font-body text-base font-light leading-relaxed text-charcoal/65">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2.85 — Virtual Estate Tour (immersive teaser)              */
/* ------------------------------------------------------------------ */

const tourHotspots = [
  {
    name: "Grand Ballroom",
    description: "Restored limestone beneath original 1924 chandeliers.",
    x: 28,
    y: 42,
  },
  {
    name: "Ceremony Lawn",
    description: "An open green where the valley falls away.",
    x: 68,
    y: 64,
  },
  {
    name: "Vineyard Terrace",
    description: "Long evenings above the estate's own vines.",
    x: 82,
    y: 30,
  },
  {
    name: "Private Gardens",
    description: "Formal parterres and the still reflecting pool.",
    x: 44,
    y: 72,
  },
];

function VirtualEstateTour() {
  const [hovered, setHovered] = useState<number | null>(null);

  const frameRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-22, 22]), {
    stiffness: 55,
    damping: 22,
  });
  const driftY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-22, 22]), {
    stiffness: 55,
    damping: 22,
  });

  function handlePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = frameRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
    setHovered(null);
  }

  return (
    <section className="bg-alabaster px-8 py-[180px] sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header — asymmetrical, left aligned */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="font-body text-xs font-medium uppercase tracking-[0.42em] text-sage">
              Virtual Estate Tour
            </p>
            <h2 className="mt-9 font-heading text-4xl font-normal leading-[1.06] text-charcoal sm:text-5xl lg:text-6xl">
              Walk The Estate
              <br />
              Before You <span className="italic text-sage">Arrive</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md font-body text-base font-light leading-relaxed text-charcoal/60 lg:col-span-5 lg:text-lg"
          >
            Move room to room through the limestone galleries, across the lawn,
            and out among the vines — an unhurried walk through the grounds,
            architecture, and gardens, experienced in full before you ever set
            foot on the property.
          </motion.p>
        </div>

        {/* Immersive interactive frame */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20"
        >
          <div
            ref={frameRef}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[2/1]"
          >
            {/* Parallax estate image with slow cinematic zoom */}
            <motion.img
              style={{ x: driftX, y: driftY }}
              initial={{ scale: 1.18 }}
              whileInView={{ scale: 1.06 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2400&auto=format&fit=crop"
              alt="Aerial view of the estate, its gardens, vineyard, and grounds"
              className="absolute inset-[-6%] h-[112%] w-[112%] object-cover"
            />

            {/* Flat charcoal scrim for hotspot legibility */}
            <div className="pointer-events-none absolute inset-0 bg-charcoal/25 transition-colors duration-700" />

            {/* Interactive hotspots */}
            {tourHotspots.map((spot, i) => {
              const isActive = hovered === i;
              return (
                <div
                  key={spot.name}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                >
                  <button
                    type="button"
                    aria-label={spot.name}
                    className="group relative flex h-12 w-12 items-center justify-center"
                  >
                    {/* Pulsing ring */}
                    <motion.span
                      animate={{
                        scale: isActive ? [1, 1.6, 1] : [1, 1.4, 1],
                        opacity: isActive ? 0 : [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute h-8 w-8 rounded-full border border-alabaster/70"
                    />
                    {/* Core dot */}
                    <span
                      className={`relative h-3 w-3 rounded-full border border-alabaster transition-all duration-500 ${
                        isActive
                          ? "scale-110 bg-alabaster"
                          : "bg-alabaster/40"
                      }`}
                    />
                  </button>

                  {/* Reveal label + description */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute left-1/2 top-9 w-60 -translate-x-1/2 text-center"
                      >
                        <span className="font-heading text-2xl font-normal text-alabaster">
                          {spot.name}
                        </span>
                        <span className="mx-auto mt-3 block h-px w-8 bg-alabaster/50" />
                        <span className="mt-3 block font-body text-sm font-light leading-relaxed text-alabaster/80">
                          {spot.description}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Standing label, recedes on interaction */}
            <motion.span
              animate={{ opacity: hovered === null ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-8 left-8 font-body text-[11px] font-medium uppercase tracking-[0.34em] text-alabaster/70"
            >
              Hover to explore the grounds
            </motion.span>
          </div>
        </motion.div>

        {/* CTA area */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-14"
        >
          <Link
            href="/estate"
            className="group inline-flex items-center gap-4 bg-charcoal px-10 py-5 font-body text-xs font-medium uppercase tracking-[0.26em] text-alabaster transition-colors duration-500 hover:bg-charcoal/85"
          >
            Explore The Estate
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 border-b border-charcoal/30 pb-2 font-body text-xs font-medium uppercase tracking-[0.26em] text-charcoal transition-colors duration-500 hover:border-charcoal"
          >
            Book a Tour
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2.9 — Real Weddings (interactive stories)                  */
/* ------------------------------------------------------------------ */

const realWeddingStories = [
  {
    title: "Spring Garden Celebration",
    couple: "Amélie & Thomas",
    season: "Spring",
    guests: 120,
    space: "The Private Gardens",
    date: "April 2025",
    excerpt:
      "Under blossoming pear and the first warm light of the year, vows were exchanged among the parterres — a morning of soft colour and quiet beginnings.",
    image:
      "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=2000&auto=format&fit=crop",
    alt: "The couple walking the estate's formal garden path as guests look on",
    tone: "#9aa392",
    href: "/gallery",
  },
  {
    title: "Summer Estate Weekend",
    couple: "Priya & Daniel",
    season: "Summer",
    guests: 160,
    space: "The Olive Terrace",
    date: "July 2025",
    excerpt:
      "Three unhurried days with the estate entirely theirs — long lunches, golden evenings, and a single table beneath the olives that stretched the length of the terrace.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop",
    alt: "Guests gathered for cocktail hour on the terrace before the lit manor",
    tone: "#efe7d6",
    href: "/weddings/eleanor-and-james",
  },
  {
    title: "Autumn Vineyard Reception",
    couple: "Sofia & Marco",
    season: "Autumn",
    guests: 140,
    space: "The Vineyard Terrace",
    date: "October 2025",
    excerpt:
      "As the vines turned from green to gold, the celebration moved above the rows for dinner under an amber sky — the valley falling quietly into dusk.",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop",
    alt: "The couple among the estate's vineyard rows at golden hour",
    tone: "#c9a86a",
    href: "/gallery",
  },
  {
    title: "Winter Candlelit Ballroom",
    couple: "Marguerite & Søren",
    season: "Winter",
    guests: 80,
    space: "The Grand Ballroom",
    date: "January 2026",
    excerpt:
      "An intimate winter evening drawn in white and candlelight, the 1924 chandeliers lit for the first dance beneath the restored limestone vaults.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2000&auto=format&fit=crop",
    alt: "The couple dancing beneath chandeliers in the candlelit ballroom",
    tone: "#b9c0c7",
    href: "/weddings/marguerite-and-soren",
  },
];

const storyLineReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function RealWeddings() {
  const [active, setActive] = useState(0);
  const story = realWeddingStories[active];

  const frameRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-20, 20]), {
    stiffness: 55,
    damping: 22,
  });
  const driftY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-20, 20]), {
    stiffness: 55,
    damping: 22,
  });

  function handlePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = frameRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="relative overflow-hidden bg-alabaster px-8 py-[180px] sm:px-12 lg:px-24">
      {/* Subtle background motion — drifting season word */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <AnimatePresence>
          <motion.span
            key={active}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 0.1, x: 0, color: story.tone }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: driftX }}
            className="absolute right-[-2%] top-[16%] select-none font-heading text-[16rem] font-normal italic leading-none"
          >
            {story.season}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-body text-xs font-medium uppercase tracking-[0.42em] text-sage">
            Real Weddings
          </p>
          <h2 className="mt-9 font-heading text-4xl font-normal leading-[1.08] text-charcoal sm:text-5xl lg:text-6xl">
            Stories Written
            <br />
            Across The <span className="italic text-sage">Estate</span>
          </h2>
          <p className="mt-10 max-w-xl font-body text-base font-light leading-relaxed text-charcoal/60 lg:text-lg">
            Every celebration leaves something behind — a season remembered, a
            corner of the grounds forever theirs. These are a few of the days the
            estate has been honoured to hold, each now part of its hundred-year
            story.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-px w-full origin-left bg-charcoal/15"
        />

        {/* Interactive stage — desktop */}
        <div className="mt-20 hidden grid-cols-12 gap-16 lg:grid">
          {/* Left — navigation */}
          <nav className="col-span-5 flex flex-col justify-center">
            <ul>
              {realWeddingStories.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.title} className="border-b border-charcoal/10">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className="group block w-full py-7 text-left"
                    >
                      <span
                        className={`font-body text-[11px] font-medium uppercase tracking-[0.3em] transition-colors duration-500 ${
                          isActive ? "text-sage" : "text-charcoal/30"
                        }`}
                      >
                        {item.season}
                      </span>
                      <span className="relative mt-3 block w-fit">
                        <span
                          className={`font-heading text-2xl font-normal transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:text-3xl ${
                            isActive
                              ? "text-charcoal"
                              : "text-charcoal/40 group-hover:translate-x-1 group-hover:text-charcoal/70"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-sage transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-50"
                          }`}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Timeline indicator */}
            <div className="mt-12 flex items-center gap-3">
              {realWeddingStories.map((item, i) => (
                <div key={item.title} className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-500 ${
                        i === active
                          ? "scale-125 bg-sage"
                          : "bg-charcoal/20"
                      }`}
                    />
                  </span>
                  {i < realWeddingStories.length - 1 && (
                    <span className="relative block h-px w-10 overflow-hidden bg-charcoal/15">
                      <motion.span
                        className="absolute inset-0 origin-left bg-sage"
                        initial={false}
                        animate={{ scaleX: i < active ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Right — visual stage */}
          <div className="col-span-7">
            <div
              ref={frameRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              className="relative aspect-[3/4] w-full overflow-hidden"
            >
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0, 8, 0] }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{
                    opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 16, ease: "easeInOut", repeat: Infinity },
                  }}
                  className="absolute inset-0"
                >
                  <motion.img
                    style={{ x: driftX, y: driftY }}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: [1.05, 1.16, 1.08, 1.14, 1.05] }}
                    transition={{
                      duration: 28,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    src={story.image}
                    alt={story.alt}
                    className="absolute inset-[-6%] h-[112%] w-[112%] object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Flat scrim for caption legibility */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-charcoal/30" />

              {/* Caption overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
                      },
                      exit: {
                        transition: { staggerChildren: 0.05, staggerDirection: -1 },
                      },
                    }}
                  >
                    <motion.p
                      variants={storyLineReveal}
                      className="font-heading text-3xl font-normal text-alabaster lg:text-4xl"
                    >
                      {story.couple}
                    </motion.p>
                    <motion.div
                      variants={storyLineReveal}
                      className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-[11px] font-medium uppercase tracking-[0.26em] text-alabaster/75"
                    >
                      <span>{story.date}</span>
                      <span className="h-3 w-px bg-alabaster/40" />
                      <span>{story.guests} Guests</span>
                      <span className="h-3 w-px bg-alabaster/40" />
                      <span>{story.space}</span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Story excerpt + View Story */}
            <div className="relative mt-10 min-h-[150px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
                    },
                    exit: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 },
                    },
                  }}
                >
                  <motion.p
                    variants={storyLineReveal}
                    className="max-w-xl font-body text-base font-light leading-relaxed text-charcoal/65 lg:text-lg"
                  >
                    {story.excerpt}
                  </motion.p>

                  <motion.div variants={storyLineReveal} className="mt-8">
                    <Link
                      href={story.href}
                      className="group inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal"
                    >
                      <span className="relative">
                        View Story
                        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-charcoal/30 transition-colors duration-500 group-hover:bg-charcoal" />
                      </span>
                      <span
                        aria-hidden
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Swipeable immersive panels — mobile & tablet */}
        <div className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {realWeddingStories.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-[85%] flex-shrink-0 snap-center sm:w-[70%]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-charcoal/30" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-alabaster/80">
                    {item.season}
                  </p>
                  <p className="mt-2 font-heading text-2xl font-normal text-alabaster">
                    {item.couple}
                  </p>
                </div>
              </div>
              <h3 className="mt-6 font-heading text-2xl font-normal text-charcoal">
                {item.title}
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-[11px] font-medium uppercase tracking-[0.24em] text-charcoal/45">
                <span>{item.date}</span>
                <span className="h-3 w-px bg-charcoal/25" />
                <span>{item.guests} Guests</span>
                <span className="h-3 w-px bg-charcoal/25" />
                <span>{item.space}</span>
              </div>
              <p className="mt-5 font-body text-base font-light leading-relaxed text-charcoal/65">
                {item.excerpt}
              </p>
              <Link
                href={item.href}
                className="group mt-7 inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal"
              >
                <span className="relative">
                  View Story
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-charcoal/30 transition-colors duration-500 group-hover:bg-charcoal" />
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA area */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-14"
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-4 bg-charcoal px-10 py-5 font-body text-xs font-medium uppercase tracking-[0.26em] text-alabaster transition-colors duration-500 hover:bg-charcoal/85"
          >
            View All Weddings
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 border-b border-charcoal/30 pb-2 font-body text-xs font-medium uppercase tracking-[0.26em] text-charcoal transition-colors duration-500 hover:border-charcoal"
          >
            Begin Your Story
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2.95 — A Letter From The Estate (emotional centerpiece)    */
/* ------------------------------------------------------------------ */

const letterReveal: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const letterLine: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const letterParagraphs = [
  "For more than a century, these grounds have kept their quiet. They have witnessed promises made in low voices, long tables set beneath summer skies, and the last dance held long after midnight, when the candles had burned to nothing.",
  "I have learned that the days that matter most are rarely loud. They arrive softly — in the turn of light across the limestone, in the hush before the first word is spoken, in the particular silence of a garden at dusk.",
  "I do not ask to be remembered. I ask only to hold the hours gently, as I have always done, and to give them back to you whole — unhurried, unforced, entirely your own.",
  "When you are ready, the gates are open. The light is waiting. And there will be a place for your story among all the others these walls have been honoured to keep.",
];

function LetterFromTheEstate() {
  return (
    <section className="bg-alabaster px-8 py-[200px] sm:px-12 lg:px-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-28">
        {/* Estate portrait — artwork */}
        <motion.figure
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <motion.img
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
              src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2000&auto=format&fit=crop"
              alt="The estate at dusk, its facade catching the last of the evening light"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.figure>

        {/* The letter */}
        <div className="lg:col-span-7 lg:pt-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-xs font-medium uppercase tracking-[0.42em] text-sage"
          >
            A Letter From The Estate
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-heading text-4xl font-normal leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl"
          >
            For Those Who Choose
            <br />
            To Celebrate <span className="italic text-sage">Here</span>
          </motion.h2>

          <motion.div
            variants={letterReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 max-w-2xl space-y-9"
          >
            {letterParagraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={letterLine}
                className="font-body text-lg font-light leading-[1.85] text-charcoal/70 lg:text-xl"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16"
          >
            <span className="block font-body text-xs font-medium uppercase tracking-[0.34em] text-charcoal/40">
              With warmth, always
            </span>
            <span
              className="mt-5 block text-5xl italic text-charcoal/85 lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Maison Verdant
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2.97 — Voices From The Estate (luxury editorial strip)     */
/* ------------------------------------------------------------------ */

const ROTATION_MS = 7000; // auto-rotate every 7 seconds

const estateVoices = [
  {
    quote:
      "We arrived expecting a venue.\nWe left feeling part of its history.",
    couple: "Amelia & Thomas",
    season: "Spring 2025",
  },
  {
    quote:
      "We arrived as guests and left with memories that still feel unreal.",
    couple: "Priya & Daniel",
    season: "Autumn 2024",
  },
  {
    quote:
      "The estate somehow felt like ours for a day.",
    couple: "Sofia & Marco",
    season: "Summer 2024",
  },
  {
    quote:
      "Months later, our families still talk about that evening.",
    couple: "Marguerite & Søren",
    season: "Winter 2023",
  },
  {
    quote:
      "The photographs are beautiful.\nThe feeling was even better.",
    couple: "Elena & James",
    season: "Spring 2024",
  },
];

function VoicesFromTheEstate() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const dragStartX = useRef<number | null>(null);

  const total = estateVoices.length;

  const advance = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
    setProgress(0);
    startRef.current = 0;
  }, [total]);

  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
    startRef.current = 0;
  }, []);

  /* --- Auto-rotation with progress --- */
  useEffect(() => {
    if (isPaused) return;
    const speed = isHovered ? 0.35 : 1; // slow on hover

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) * speed;
      const pct = Math.min(elapsed / ROTATION_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        advance();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeIdx, isPaused, isHovered, advance]);

  /* --- Drag / swipe handlers --- */
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        goTo((activeIdx + 1) % total);
      } else {
        goTo((activeIdx - 1 + total) % total);
      }
    }
    dragStartX.current = null;
  };

  const voice = estateVoices[activeIdx];

  return (
    <section
      className="relative overflow-hidden bg-alabaster"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating quotation mark artwork */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5 }}
        animate={{ x: isHovered ? 4 : 0, y: isHovered ? -3 : 0 }}
        className="pointer-events-none absolute left-[8%] top-[10%] select-none font-heading text-[18rem] leading-none text-charcoal sm:text-[22rem] lg:text-[28rem]"
      >
        &ldquo;
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, delay: 0.2 }}
        animate={{ x: isHovered ? -3 : 0, y: isHovered ? 2 : 0 }}
        className="pointer-events-none absolute bottom-[5%] right-[8%] select-none font-heading text-[14rem] leading-none text-charcoal sm:text-[18rem] lg:text-[22rem]"
      >
        &rdquo;
      </motion.span>

      <div
        className="relative mx-auto flex min-h-[380px] max-w-5xl flex-col items-center justify-center px-8 py-20 sm:min-h-[400px] sm:px-12 lg:min-h-[420px] lg:px-24"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 font-body text-[10px] font-medium uppercase tracking-[0.42em] text-sage sm:text-xs"
        >
          Voices From The Estate
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center font-heading text-2xl font-normal leading-[1.15] text-charcoal sm:text-3xl lg:text-4xl"
        >
          A Few Words<br />
          That Stayed <span className="italic text-sage">Behind</span>
        </motion.h2>

        {/* Quote area — fixed-height container for smooth transitions */}
        <div className="relative flex min-h-[120px] w-full items-center justify-center sm:min-h-[130px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={activeIdx}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* The quote */}
              <motion.blockquote
                className="max-w-2xl cursor-grab select-none whitespace-pre-line font-heading text-xl font-normal italic leading-[1.55] text-charcoal/90 active:cursor-grabbing sm:text-2xl lg:text-[1.75rem] lg:leading-[1.6]"
                animate={{ filter: isHovered ? "brightness(1.05)" : "brightness(1)" }}
                transition={{ duration: 0.4 }}
              >
                &ldquo;{voice.quote}&rdquo;
              </motion.blockquote>

              {/* Couple name — slight delay */}
              <motion.figcaption
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-body text-xs font-medium uppercase tracking-[0.32em] text-charcoal/70"
              >
                — {voice.couple}
              </motion.figcaption>

              {/* Season */}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 font-body text-[10px] font-light uppercase tracking-[0.3em] text-sage"
              >
                {voice.season}
              </motion.span>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="mt-10 flex items-center gap-2">
          {estateVoices.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View testimonial ${i + 1}`}
              className="group relative h-[3px] overflow-hidden rounded-full transition-all duration-500"
              style={{ width: i === activeIdx ? 40 : 14 }}
            >
              {/* Track */}
              <span className="absolute inset-0 rounded-full bg-charcoal/12" />
              {/* Fill */}
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-sage"
                style={{
                  scaleX: i === activeIdx ? progress : i < activeIdx ? 1 : 0,
                }}
                transition={{ duration: 0.08, ease: "linear" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom border to separate from next section */}
      <div className="mx-auto max-w-5xl px-8 sm:px-12 lg:px-24">
        <div className="h-px bg-charcoal/8" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2.98 — Trusted Partners (the private black book)           */
/* ------------------------------------------------------------------ */

const partnerCategories = [
  {
    category: "Floral Design",
    partner: "Atelier Mirelle",
    specialty: "Seasonal, foraged arrangements",
    description:
      "Painterly, untamed compositions drawn from the estate's own cutting garden — flowers that look as though they were gathered that morning, because they were.",
    href: "https://example.com/atelier-mirelle",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
    alt: "Foraged floral arrangement in muted, painterly tones",
  },
  {
    category: "Photography",
    partner: "Théo Lambert Studio",
    specialty: "Film-forward, documentary",
    description:
      "A restrained, editorial eye that works in available light and waits for the quiet moments — the look between vows, the empty room after the dance.",
    href: "https://example.com/theo-lambert",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1600&auto=format&fit=crop",
    alt: "A photographer's film camera resting on linen in soft light",
  },
  {
    category: "Catering",
    partner: "Maison du Goût",
    specialty: "Farm-to-table tasting menus",
    description:
      "Menus built each season around the kitchen garden and the valley's small producers — unhurried, generous, and quietly precise.",
    href: "https://example.com/maison-du-gout",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop",
    alt: "A plated tasting-menu course in a candlelit dining room",
  },
  {
    category: "Entertainment",
    partner: "Quartet Verdant",
    specialty: "Classical strings & evening jazz",
    description:
      "A string ensemble for the ceremony and discreet jazz for the long evening — musicians who understand that the room, not the stage, is the occasion.",
    href: "https://example.com/quartet-verdant",
    image:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1600&auto=format&fit=crop",
    alt: "A string ensemble performing by candlelight",
  },
  {
    category: "Planning",
    partner: "Lune Planning Co.",
    specialty: "Full-service design & direction",
    description:
      "Planners for couples who value calm over spectacle — orchestrating every detail so completely that, on the day, nothing seems to have been planned at all.",
    href: "https://example.com/lune-planning",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop",
    alt: "A planner's mood board of fabric swatches and stationery",
  },
];

function TrustedPartners() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-charcoal px-8 py-[180px] text-alabaster sm:px-12 lg:px-24">
      {/* Background photographs — softly change with selected category */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={open}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.22, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={partnerCategories[open].image}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-body text-xs font-medium uppercase tracking-[0.42em] text-sage">
            Trusted Partners
          </p>
          <h2 className="mt-9 font-heading text-4xl font-normal leading-[1.1] text-alabaster sm:text-5xl lg:text-6xl">
            The People
            <br />
            Behind The <span className="italic text-sage">Details</span>
          </h2>
          <p className="mt-10 max-w-xl font-body text-base font-light leading-relaxed text-alabaster/65 lg:text-lg">
            Our celebrations are shaped by craftspeople we have trusted for
            years — a small, closely held circle the estate recommends to no one
            lightly.
          </p>
        </motion.div>

        {/* Editorial expanding list */}
        <div className="mt-20 border-t border-alabaster/15">
          {partnerCategories.map((item, i) => {
            const isOpen = i === open;
            return (
              <div key={item.category} className="border-b border-alabaster/15">
                <button
                  type="button"
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-8 py-9 text-left"
                >
                  <span className="flex items-baseline gap-6">
                    <span
                      className={`font-body text-xs font-medium tracking-[0.3em] transition-colors duration-500 ${
                        isOpen ? "text-sage" : "text-alabaster/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-heading text-3xl font-normal transition-colors duration-500 lg:text-5xl ${
                        isOpen
                          ? "text-alabaster"
                          : "text-alabaster/45 group-hover:text-alabaster/75"
                      }`}
                    >
                      {item.category}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 font-body text-2xl font-light text-alabaster/50"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7 lg:pl-[4.5rem]">
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.15,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="font-heading text-2xl font-normal italic text-alabaster lg:text-3xl"
                          >
                            {item.partner}
                          </motion.p>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.25,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-alabaster/70 lg:text-lg"
                          >
                            {item.description}
                          </motion.p>
                        </div>

                        <div className="lg:col-span-5 lg:text-right">
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-sage"
                          >
                            {item.specialty}
                          </motion.p>
                          <motion.a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.38,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group mt-7 inline-flex items-center gap-3 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-alabaster"
                          >
                            <span className="relative">
                              Visit Atelier
                              <span className="absolute -bottom-1 left-0 h-px w-full bg-alabaster/40 transition-colors duration-500 group-hover:bg-alabaster" />
                            </span>
                            <span
                              aria-hidden
                              className="transition-transform duration-500 group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2.99 — Private Invitation (conversion)                     */
/* ------------------------------------------------------------------ */

const celebrationTypes = [
  "Wedding",
  "Anniversary",
  "Private Celebration",
  "Other",
];
const guestBands = ["Under 60", "60 – 100", "100 – 140", "140 – 180", "180+"];
const seasonChoices = ["Spring", "Summer", "Autumn", "Winter"];

function PrivateInvitation() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const depthX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-24, 24]), {
    stiffness: 50,
    damping: 22,
  });
  const depthY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-24, 24]), {
    stiffness: 50,
    damping: 22,
  });

  function handlePointerMove(event: React.MouseEvent<HTMLElement>) {
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const fieldClass =
    "peer w-full border-b border-alabaster/25 bg-transparent py-4 font-body text-base font-light text-alabaster placeholder:text-alabaster/40 transition-all duration-500 focus:border-sage focus:outline-none focus:[box-shadow:0_8px_24px_-12px_rgba(154,163,146,0.9)]";
  const labelClass =
    "mb-1 block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-alabaster/45 transition-colors duration-500 peer-focus:text-sage";

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative flex min-h-screen items-center overflow-hidden bg-charcoal px-8 py-32 text-alabaster sm:px-12 lg:px-24"
    >
      {/* Cinematic estate image — breathing + depth + parallax */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div style={{ x: depthX, y: depthY }} className="absolute inset-0">
          <motion.img
            style={{ y: scrollParallax }}
            initial={{ scale: 1.1 }}
            animate={{ scale: [1.1, 1.18, 1.1] }}
            transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
            src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2400&auto=format&fit=crop"
            alt="The estate at dusk, its facade and grounds in the last light"
            className="absolute inset-[-8%] h-[116%] w-[116%] object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
        {/* Invitation copy */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 lg:pt-6"
        >
          <p className="font-body text-xs font-medium uppercase tracking-[0.42em] text-sage">
            Private Invitation
          </p>
          <h2 className="mt-9 font-heading text-5xl font-normal leading-[1.04] text-alabaster sm:text-6xl lg:text-7xl">
            See The Estate
            <br />
            In <span className="italic text-sage">Person</span>
          </h2>
          <p className="mt-10 max-w-md font-body text-base font-light leading-relaxed text-alabaster/70 lg:text-lg">
            The grounds are best understood slowly, in person, and in their own
            light.
          </p>
        </motion.div>

        {/* The form */}
        <motion.form
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={(e) => e.preventDefault()}
          className="lg:col-span-6"
        >
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <div className="flex flex-col-reverse sm:col-span-1">
              <input
                id="pi-name"
                type="text"
                placeholder="Your name"
                className={fieldClass}
              />
              <label htmlFor="pi-name" className={labelClass}>
                Name
              </label>
            </div>

            <div className="flex flex-col-reverse sm:col-span-1">
              <input
                id="pi-email"
                type="email"
                placeholder="you@email.com"
                className={fieldClass}
              />
              <label htmlFor="pi-email" className={labelClass}>
                Email
              </label>
            </div>

            <div className="flex flex-col-reverse sm:col-span-1">
              <select id="pi-type" defaultValue="" className={`${fieldClass} text-alabaster/70`}>
                <option value="" disabled className="bg-charcoal text-alabaster/60">
                  Select
                </option>
                {celebrationTypes.map((t) => (
                  <option key={t} value={t} className="bg-charcoal text-alabaster">
                    {t}
                  </option>
                ))}
              </select>
              <label htmlFor="pi-type" className={labelClass}>
                Celebration Type
              </label>
            </div>

            <div className="flex flex-col-reverse sm:col-span-1">
              <select id="pi-guests" defaultValue="" className={`${fieldClass} text-alabaster/70`}>
                <option value="" disabled className="bg-charcoal text-alabaster/60">
                  Select
                </option>
                {guestBands.map((g) => (
                  <option key={g} value={g} className="bg-charcoal text-alabaster">
                    {g}
                  </option>
                ))}
              </select>
              <label htmlFor="pi-guests" className={labelClass}>
                Estimated Guest Count
              </label>
            </div>

            <div className="flex flex-col-reverse sm:col-span-2">
              <select id="pi-season" defaultValue="" className={`${fieldClass} text-alabaster/70`}>
                <option value="" disabled className="bg-charcoal text-alabaster/60">
                  Select
                </option>
                {seasonChoices.map((s) => (
                  <option key={s} value={s} className="bg-charcoal text-alabaster">
                    {s}
                  </option>
                ))}
              </select>
              <label htmlFor="pi-season" className={labelClass}>
                Preferred Season
              </label>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-14 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
            <button
              type="submit"
              className="group inline-flex items-center gap-4 bg-alabaster px-10 py-5 font-body text-xs font-medium uppercase tracking-[0.26em] text-charcoal transition-colors duration-500 hover:bg-sage hover:text-alabaster"
            >
              Arrange a Private Tour
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            <button
              type="button"
              className="group inline-flex items-center gap-3 border-b border-alabaster/30 pb-2 font-body text-xs font-medium uppercase tracking-[0.26em] text-alabaster transition-colors duration-500 hover:border-alabaster"
            >
              Request Information
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      <Hero />
      <Estate />
      <FeaturedIn />
      <SignatureSpaces />
      <VirtualEstateTour />
      <RealWeddings />
      <LetterFromTheEstate />
      <VoicesFromTheEstate />
      <TrustedPartners />
      <Philosophy />
      <Pathways />
      <PrivateInvitation />
    </>
  );
}
