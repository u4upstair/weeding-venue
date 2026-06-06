"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const links = [
  { label: "The Estate", href: "/estate" },
  { label: "Weddings", href: "/weddings" },
  { label: "Private Events", href: "/private-events" },
  { label: "Gallery", href: "/gallery" },
];

/** Maximum pixels the button is pulled toward the cursor. */
const MAGNET_STRENGTH = 15;

function MagneticBookButton() {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    type: "spring" as const,
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // Cursor position relative to the button's center.
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    // Normalize to [-1, 1] across each axis, then scale to MAGNET_STRENGTH.
    // Clamping keeps the pull bounded so layout can never jump or overflow.
    const normX = Math.max(-1, Math.min(1, relX / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, relY / (rect.height / 2)));

    x.set(normX * MAGNET_STRENGTH);
    y.set(normY * MAGNET_STRENGTH);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // Wrapper reserves the layout box and gives the elevation shadow room to
    // breathe so it is never clipped by the nav row.
    <span className="relative inline-block p-2">
      <motion.a
        ref={ref}
        href="/book-a-tour"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className="inline-block bg-black text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest rounded-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.02] hover:bg-black/80 hover:shadow-2xl hover:shadow-black/20"
      >
        Book a Tour
      </motion.a>
    </span>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-alabaster/95 shadow-sm backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 lg:px-12">
        {/* Left — Logo */}
        <Link
          href="/"
          className={`font-heading text-xl tracking-wide transition-colors duration-500 ${
            isScrolled ? "text-charcoal" : "text-white"
          }`}
        >
          Maison&nbsp;Verdant
        </Link>

        {/* Middle — Links */}
        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group relative text-xs font-semibold uppercase tracking-widest transition-colors duration-500 ${
                  isScrolled
                    ? "text-charcoal/70 hover:text-charcoal"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-charcoal" : "bg-white"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right — CTA (magnetic) */}
        <div className="flex items-center gap-4">
          <MagneticBookButton />

          {/* Mobile menu trigger */}
          <button
            aria-label="Open menu"
            className="flex flex-col gap-1.5 lg:hidden"
          >
            <span
              className={`block h-px w-7 transition-colors duration-500 ${
                isScrolled ? "bg-charcoal" : "bg-white"
              }`}
            />
            <span
              className={`block h-px w-7 transition-colors duration-500 ${
                isScrolled ? "bg-charcoal" : "bg-white"
              }`}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
