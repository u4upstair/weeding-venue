"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { galleryImages, type GalleryImage } from "@/constants/dummyData";

const filters = [
  { label: "All", value: "all" as const },
  { label: "Ceremonies", value: "Ceremony" as const },
  { label: "Receptions", value: "Reception" as const },
  { label: "Grounds", value: "Estate" as const },
] satisfies { label: string; value: "all" | GalleryImage["category"] }[];

export default function GalleryPage() {
  const [active, setActive] = useState<(typeof filters)[number]["value"]>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? galleryImages
        : galleryImages.filter((img) => img.category === active),
    [active]
  );

  return (
    <section className="bg-alabaster pb-40 pt-40 lg:pb-56 lg:pt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="font-body text-xs font-medium uppercase tracking-[0.28em] text-sage">
            Gallery
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-tight text-charcoal lg:text-6xl">
            Moments, unhurried.
          </h1>
        </div>

        {/* Filter */}
        <div className="mt-14 flex flex-wrap gap-x-9 gap-y-3 border-b border-charcoal/10 pb-6 lg:mt-20">
          {filters.map((f) => {
            const isActive = f.value === active;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setActive(f.value)}
                className={`relative font-body text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal/70"
                }`}
              >
                {f.label}
                {isActive && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute -bottom-[25px] left-0 h-px w-full bg-charcoal"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((img) => (
                <motion.figure
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden ${
                    img.orientation === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/20" />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 font-body text-[11px] uppercase tracking-[0.16em] text-alabaster opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.category}
                  </figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
