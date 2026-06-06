import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  realWeddings,
  galleryImages,
  preferredVendors,
} from "@/constants/dummyData";

export function generateStaticParams() {
  return realWeddings.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const wedding = realWeddings.find((w) => w.slug === params.slug);
  if (!wedding) return { title: "Real Weddings — Maison Verdant" };

  return {
    title: `${wedding.couple} — A Real Wedding at Maison Verdant`,
    description: wedding.excerpt,
    openGraph: {
      title: `${wedding.couple} at Maison Verdant`,
      description: wedding.excerpt,
      images: [{ url: wedding.heroImage }],
      type: "article",
    },
  };
}

export default function RealWeddingPage({
  params,
}: {
  params: { slug: string };
}) {
  const wedding = realWeddings.find((w) => w.slug === params.slug);
  if (!wedding) notFound();

  const images = wedding.galleryImageIds
    .map((id) => galleryImages.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <article className="bg-alabaster">
      {/* ---------- Hero ---------- */}
      <header className="relative flex h-[88vh] min-h-[600px] items-end overflow-hidden">
        <Image
          src={wedding.heroImage}
          alt={wedding.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/15 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 lg:px-12 lg:pb-32">
          <p className="font-body text-xs font-medium uppercase tracking-[0.28em] text-alabaster/70">
            Real Weddings · {wedding.season}
          </p>
          <h1 className="mt-6 font-heading text-5xl leading-[1.06] text-alabaster sm:text-6xl lg:text-7xl">
            {wedding.couple}
          </h1>
          <p className="mt-6 font-body text-sm font-light uppercase tracking-[0.18em] text-alabaster/80">
            {wedding.date} · {wedding.guestCount} Guests · {wedding.location}
          </p>
        </div>
      </header>

      {/* ---------- Narrative ---------- */}
      <section className="mx-auto max-w-3xl px-6 py-28 lg:py-40">
        <p className="font-heading text-2xl leading-relaxed text-charcoal lg:text-3xl">
          {wedding.excerpt}
        </p>
        <div className="mt-12 space-y-7">
          {wedding.narrative.map((p, i) => (
            <p
              key={i}
              className="font-body text-base font-light leading-relaxed text-charcoal/70 lg:text-lg"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ---------- Image story ---------- */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-12 lg:pb-40">
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {images.map((img, i) => (
            <figure
              key={img.id}
              className={`relative overflow-hidden ${
                i % 3 === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[3/4]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- Vendors (SEO interlinking) ---------- */}
      <section className="border-t border-charcoal/10 bg-alabaster py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="font-body text-xs font-medium uppercase tracking-[0.28em] text-sage">
            The Team
          </p>
          <h2 className="mt-5 font-heading text-4xl leading-tight text-charcoal lg:text-5xl">
            Behind the day.
          </h2>

          <dl className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {wedding.vendors.map(({ role, vendorId }) => {
              const vendor = preferredVendors.find((v) => v.id === vendorId);
              if (!vendor) return null;
              return (
                <div
                  key={`${role}-${vendorId}`}
                  className="border-t border-charcoal/10 pt-5"
                >
                  <dt className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-charcoal/40">
                    {role}
                  </dt>
                  <dd className="mt-3">
                    <Link
                      href={`/vendors/${vendor.id}`}
                      className="font-heading text-2xl text-charcoal transition-colors duration-300 hover:text-sage"
                    >
                      {vendor.name}
                    </Link>
                    <p className="mt-2 font-body text-sm font-light leading-relaxed text-charcoal/60">
                      {vendor.location} — {vendor.blurb}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-20 border-t border-charcoal/10 pt-10">
            <Link
              href="/weddings"
              className="inline-flex items-center gap-3 font-body text-xs font-medium uppercase tracking-[0.22em] text-charcoal transition-colors hover:text-sage"
            >
              <span aria-hidden>←</span>
              All Real Weddings
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
