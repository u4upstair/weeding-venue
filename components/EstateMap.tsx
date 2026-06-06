"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Zone {
  id: string;
  name: string;
  capacity: string;
  blurb: string;
  /** SVG rect geometry (viewBox 0 0 800 500) */
  x: number;
  y: number;
  w: number;
  h: number;
  labelX: number;
  labelY: number;
}

const zones: Zone[] = [
  {
    id: "courtyard",
    name: "The Courtyard",
    capacity: "Up to 120 seated",
    blurb:
      "An open-air limestone court framed by century-old olive trees. Ideal for golden-hour ceremonies and aperitif hours beneath the sky.",
    x: 40,
    y: 60,
    w: 300,
    h: 380,
    labelX: 190,
    labelY: 250,
  },
  {
    id: "ballroom",
    name: "The Grand Ballroom",
    capacity: "Up to 180 seated",
    blurb:
      "Double-height ceilings, original parquet, and chandeliers restored from the 1924 commission. The estate's centerpiece for dinner and dancing.",
    x: 360,
    y: 60,
    w: 400,
    h: 220,
    labelX: 560,
    labelY: 170,
  },
  {
    id: "conservatory",
    name: "The Conservatory",
    capacity: "Up to 90 seated",
    blurb:
      "A glass-walled winter garden flooded with northern light. Reserved for intimate ceremonies and seasonal celebrations.",
    x: 360,
    y: 300,
    w: 190,
    h: 140,
    labelX: 455,
    labelY: 370,
  },
  {
    id: "terrace",
    name: "The Olive Terrace",
    capacity: "Standing reception",
    blurb:
      "A tiered stone terrace overlooking the reflecting pool — the estate's favored setting for evening receptions and quiet toasts.",
    x: 570,
    y: 300,
    w: 190,
    h: 140,
    labelX: 665,
    labelY: 370,
  },
];

export default function EstateMap() {
  const [activeId, setActiveId] = useState<string>("courtyard");
  const active = zones.find((z) => z.id === activeId)!;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Map */}
      <div className="lg:col-span-7">
        <svg
          viewBox="0 0 800 500"
          className="w-full"
          role="group"
          aria-label="Interactive estate map"
        >
          {zones.map((zone) => {
            const isActive = zone.id === activeId;
            return (
              <g
                key={zone.id}
                onClick={() => setActiveId(zone.id)}
                className="cursor-pointer"
                role="button"
                aria-pressed={isActive}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveId(zone.id);
                }}
              >
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.w}
                  height={zone.h}
                  rx={4}
                  className={`transition-all duration-500 ${
                    isActive
                      ? "fill-sage/30 stroke-sage"
                      : "fill-charcoal/[0.04] stroke-charcoal/20 hover:fill-charcoal/[0.07]"
                  }`}
                  strokeWidth={1.5}
                />
                <text
                  x={zone.labelX}
                  y={zone.labelY}
                  textAnchor="middle"
                  className={`pointer-events-none select-none font-body text-[15px] uppercase tracking-[0.12em] transition-colors duration-500 ${
                    isActive ? "fill-charcoal" : "fill-charcoal/50"
                  }`}
                  style={{ fontVariant: "small-caps" }}
                >
                  {zone.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <div className="lg:col-span-5 lg:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs font-medium uppercase tracking-[0.26em] text-sage">
              {active.capacity}
            </p>
            <h3 className="mt-4 font-heading text-3xl text-charcoal lg:text-4xl">
              {active.name}
            </h3>
            <p className="mt-6 max-w-md font-body text-base font-light leading-relaxed text-charcoal/70">
              {active.blurb}
            </p>

            <ul className="mt-10 flex flex-wrap gap-2">
              {zones.map((z) => (
                <li key={z.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(z.id)}
                    className={`rounded-full border px-4 py-2 font-body text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                      z.id === activeId
                        ? "border-charcoal bg-charcoal text-alabaster"
                        : "border-charcoal/20 text-charcoal/60 hover:border-charcoal/50"
                    }`}
                  >
                    {z.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
