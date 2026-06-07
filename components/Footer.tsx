"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: "The Estate", href: "/estate" },
  { label: "Weddings", href: "/weddings" },
  { label: "Private Events", href: "/private-events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Book A Tour", href: "/contact" },
];

const contactDetails = {
  phone: { display: "+1 (707) 555-0199", href: "tel:+17075550199" },
  email: { display: "hello@maisonverdant.com", href: "mailto:hello@maisonverdant.com" },
  address: "4200 Olive Terrace Road, Sonoma Valley, California 95476",
};

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Vimeo", href: "https://vimeo.com" },
];

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Architectural SVG line drawing                                     */
/* ------------------------------------------------------------------ */

function EstateSilhouette() {
  return (
    <svg
      viewBox="0 0 1200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-auto w-[90%] max-w-[1100px] -translate-y-1/2 select-none opacity-[0.03]"
      aria-hidden
    >
      {/* Main building body */}
      <rect x="300" y="140" width="600" height="200" rx="0" stroke="currentColor" strokeWidth="1" />

      {/* Central pediment / gable */}
      <path d="M 450 140 L 600 60 L 750 140" stroke="currentColor" strokeWidth="1" />

      {/* Pediment inner triangle accent */}
      <path d="M 500 140 L 600 85 L 700 140" stroke="currentColor" strokeWidth="0.5" />

      {/* Central dome */}
      <ellipse cx="600" cy="60" rx="30" ry="18" stroke="currentColor" strokeWidth="0.8" />
      <line x1="600" y1="42" x2="600" y2="28" stroke="currentColor" strokeWidth="0.8" />

      {/* Central doorway */}
      <rect x="570" y="250" width="60" height="90" rx="0" stroke="currentColor" strokeWidth="0.8" />
      <path d="M 570 250 Q 600 225 630 250" stroke="currentColor" strokeWidth="0.8" />

      {/* Ground-floor windows — left */}
      <rect x="340" y="260" width="40" height="55" stroke="currentColor" strokeWidth="0.6" />
      <rect x="400" y="260" width="40" height="55" stroke="currentColor" strokeWidth="0.6" />
      <rect x="460" y="260" width="40" height="55" stroke="currentColor" strokeWidth="0.6" />

      {/* Ground-floor windows — right */}
      <rect x="700" y="260" width="40" height="55" stroke="currentColor" strokeWidth="0.6" />
      <rect x="760" y="260" width="40" height="55" stroke="currentColor" strokeWidth="0.6" />
      <rect x="820" y="260" width="40" height="55" stroke="currentColor" strokeWidth="0.6" />

      {/* Upper windows — left */}
      <rect x="340" y="165" width="40" height="50" stroke="currentColor" strokeWidth="0.5" />
      <rect x="400" y="165" width="40" height="50" stroke="currentColor" strokeWidth="0.5" />
      <rect x="460" y="165" width="40" height="50" stroke="currentColor" strokeWidth="0.5" />

      {/* Upper windows — right */}
      <rect x="700" y="165" width="40" height="50" stroke="currentColor" strokeWidth="0.5" />
      <rect x="760" y="165" width="40" height="50" stroke="currentColor" strokeWidth="0.5" />
      <rect x="820" y="165" width="40" height="50" stroke="currentColor" strokeWidth="0.5" />

      {/* Left wing */}
      <rect x="120" y="180" width="180" height="160" stroke="currentColor" strokeWidth="0.8" />
      <rect x="145" y="210" width="30" height="40" stroke="currentColor" strokeWidth="0.4" />
      <rect x="195" y="210" width="30" height="40" stroke="currentColor" strokeWidth="0.4" />
      <rect x="245" y="210" width="30" height="40" stroke="currentColor" strokeWidth="0.4" />
      <rect x="145" y="275" width="30" height="45" stroke="currentColor" strokeWidth="0.4" />
      <rect x="195" y="275" width="30" height="45" stroke="currentColor" strokeWidth="0.4" />
      <rect x="245" y="275" width="30" height="45" stroke="currentColor" strokeWidth="0.4" />

      {/* Right wing */}
      <rect x="900" y="180" width="180" height="160" stroke="currentColor" strokeWidth="0.8" />
      <rect x="925" y="210" width="30" height="40" stroke="currentColor" strokeWidth="0.4" />
      <rect x="975" y="210" width="30" height="40" stroke="currentColor" strokeWidth="0.4" />
      <rect x="1025" y="210" width="30" height="40" stroke="currentColor" strokeWidth="0.4" />
      <rect x="925" y="275" width="30" height="45" stroke="currentColor" strokeWidth="0.4" />
      <rect x="975" y="275" width="30" height="45" stroke="currentColor" strokeWidth="0.4" />
      <rect x="1025" y="275" width="30" height="45" stroke="currentColor" strokeWidth="0.4" />

      {/* Connecting porticoes */}
      <line x1="300" y1="200" x2="300" y2="340" stroke="currentColor" strokeWidth="0.6" />
      <line x1="900" y1="200" x2="900" y2="340" stroke="currentColor" strokeWidth="0.6" />

      {/* Rooflines — wings */}
      <line x1="110" y1="180" x2="310" y2="180" stroke="currentColor" strokeWidth="0.8" />
      <line x1="890" y1="180" x2="1090" y2="180" stroke="currentColor" strokeWidth="0.8" />

      {/* Ground line */}
      <line x1="60" y1="340" x2="1140" y2="340" stroke="currentColor" strokeWidth="0.6" />

      {/* Steps at entrance */}
      <line x1="550" y1="340" x2="650" y2="340" stroke="currentColor" strokeWidth="0.8" />
      <line x1="555" y1="348" x2="645" y2="348" stroke="currentColor" strokeWidth="0.5" />
      <line x1="560" y1="355" x2="640" y2="355" stroke="currentColor" strokeWidth="0.4" />

      {/* Landscape — trees */}
      <ellipse cx="50" cy="310" rx="35" ry="45" stroke="currentColor" strokeWidth="0.4" />
      <line x1="50" y1="340" x2="50" y2="355" stroke="currentColor" strokeWidth="0.3" />
      <ellipse cx="1150" cy="310" rx="35" ry="45" stroke="currentColor" strokeWidth="0.4" />
      <line x1="1150" y1="340" x2="1150" y2="355" stroke="currentColor" strokeWidth="0.3" />

      {/* Landscape — hedges */}
      <path d="M 80 340 Q 100 330 120 340" stroke="currentColor" strokeWidth="0.3" />
      <path d="M 1080 340 Q 1100 330 1120 340" stroke="currentColor" strokeWidth="0.3" />

      {/* Chimneys */}
      <rect x="360" y="120" width="12" height="25" stroke="currentColor" strokeWidth="0.4" />
      <rect x="830" y="120" width="12" height="25" stroke="currentColor" strokeWidth="0.4" />

      {/* Balustrade at roofline */}
      {[320, 345, 370, 395, 420, 780, 805, 830, 855, 880].map((x) => (
        <line key={x} x1={x} y1="140" x2={x} y2="135" stroke="currentColor" strokeWidth="0.3" />
      ))}
      <line x1="310" y1="135" x2="430" y2="135" stroke="currentColor" strokeWidth="0.3" />
      <line x1="770" y1="135" x2="890" y2="135" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer link with hover micro-interaction                           */
/* ------------------------------------------------------------------ */

function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const inner = (
    <motion.span
      className="group relative inline-block font-body text-sm font-light tracking-[0.04em] text-alabaster/55 transition-colors duration-500 hover:text-alabaster"
      whileHover={{ x: 3 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sage transition-all duration-500 group-hover:w-full" />
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <Link href={href}>{inner}</Link>;
}

/* ------------------------------------------------------------------ */
/*  Footer component                                                   */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-alabaster">
      {/* Architectural line drawing background */}
      <div className="pointer-events-none absolute inset-0 text-alabaster">
        <EstateSilhouette />
      </div>

      {/* ── Top section: massive estate name ── */}
      <div className="relative px-8 pt-40 sm:px-12 lg:px-24 lg:pt-52">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl"
        >
          {/* Estate name — massive display */}
          <motion.h2
            variants={fadeUp}
            className="text-center font-heading text-[clamp(3rem,10vw,9rem)] font-normal uppercase leading-[0.9] tracking-[0.12em] text-alabaster"
          >
            Maison Verdant
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-lg text-center font-body text-sm font-light leading-relaxed tracking-[0.06em] text-alabaster/50 sm:text-base"
          >
            An estate devoted to beautiful celebrations since 1924.
          </motion.p>

          {/* Thin separator */}
          <motion.div
            variants={fadeIn}
            className="mx-auto mt-20 h-px w-full max-w-5xl bg-alabaster/10"
          />
        </motion.div>
      </div>

      {/* ── Middle section: navigation + contact + social ── */}
      <div className="relative px-8 py-24 sm:px-12 lg:px-24 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12"
        >
          {/* Navigation */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.42em] text-alabaster/30">
              Navigate
            </p>
            <ul className="mt-8 space-y-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.42em] text-alabaster/30">
              Contact
            </p>
            <address className="mt-8 space-y-5 not-italic">
              <div>
                <FooterLink
                  href={contactDetails.phone.href}
                  label={contactDetails.phone.display}
                />
              </div>
              <div>
                <FooterLink
                  href={contactDetails.email.href}
                  label={contactDetails.email.display}
                />
              </div>
              <p className="font-body text-sm font-light leading-relaxed tracking-[0.04em] text-alabaster/45">
                {contactDetails.address}
              </p>
            </address>
          </motion.div>

          {/* Social */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.42em] text-alabaster/30">
              Social
            </p>
            <ul className="mt-8 space-y-5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink
                    href={link.href}
                    label={link.label}
                    external
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom: closing publication sentence + legal ── */}
      <div className="relative px-8 pb-16 sm:px-12 lg:px-24 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          {/* Separator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="h-px w-full bg-alabaster/10"
          />

          {/* Closing sentence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 text-center font-heading text-lg font-normal italic leading-relaxed text-alabaster/35 sm:text-xl lg:text-2xl"
          >
            &ldquo;Every celebration becomes part of the estate&rsquo;s story.&rdquo;
          </motion.p>

          {/* Legal bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="mt-16 flex flex-col items-center justify-between gap-6 sm:flex-row"
          >
            <p className="font-body text-[10px] font-light uppercase tracking-[0.2em] text-alabaster/25">
              © {new Date().getFullYear()} Maison Verdant. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/privacy"
                className="font-body text-[10px] font-light uppercase tracking-[0.2em] text-alabaster/25 transition-colors duration-500 hover:text-alabaster/50"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="font-body text-[10px] font-light uppercase tracking-[0.2em] text-alabaster/25 transition-colors duration-500 hover:text-alabaster/50"
              >
                Terms
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
