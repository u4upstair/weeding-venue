import Link from "next/link";

const navColumns = [
  {
    title: "Visit",
    links: [
      { label: "The Estate", href: "/estate" },
      { label: "Gallery", href: "/gallery" },
      { label: "Book a Tour", href: "/book-a-tour" },
    ],
  },
  {
    title: "Celebrate",
    links: [
      { label: "Weddings", href: "/weddings" },
      { label: "Private Events", href: "/private-events" },
      { label: "Preferred Vendors", href: "/vendors" },
    ],
  },
  {
    title: "Guests",
    links: [
      { label: "Client Login", href: "/login" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Journal", href: "/journal" },
];

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-alabaster">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-3xl leading-tight text-charcoal lg:text-4xl">
              Maison Verdant
            </h2>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-charcoal/60">
              A single celebration each weekend, set within 220 acres of rolling
              sage hills. Established 1924.
            </p>

            <address className="mt-10 not-italic font-body text-sm leading-relaxed text-charcoal/70">
              4200 Olive Terrace Road
              <br />
              Sonoma Valley, California 95476
              <br />
              <a
                href="tel:+17075550199"
                className="mt-3 inline-block text-charcoal transition-colors hover:text-sage"
              >
                +1 (707) 555-0199
              </a>
              <br />
              <a
                href="mailto:hello@maisonverdant.com"
                className="text-charcoal transition-colors hover:text-sage"
              >
                hello@maisonverdant.com
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {navColumns.map((col) => (
              <div key={col.title}>
                <h3 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-charcoal/40">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-charcoal/70 transition-colors hover:text-charcoal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs uppercase tracking-[0.16em] text-charcoal/40">
            © {new Date().getFullYear()} Maison Verdant. All rights reserved.
          </p>
          <ul className="flex items-center gap-8">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="font-body text-xs uppercase tracking-[0.16em] text-charcoal/60 transition-colors hover:text-charcoal"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
