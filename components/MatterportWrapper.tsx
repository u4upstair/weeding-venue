"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MatterportWrapperProps {
  modelId?: string;
  posterSrc?: string;
  posterAlt?: string;
  title?: string;
}

const DEFAULT_POSTER =
  "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&w=1600&q=80";

export default function MatterportWrapper({
  modelId = "SxQL3iGyoDo",
  posterSrc = DEFAULT_POSTER,
  posterAlt = "Interior gallery, candlelit",
  title = "Explore the Estate in 3D",
}: MatterportWrapperProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal">
      <AnimatePresence mode="wait">
        {!active ? (
          <motion.button
            key="poster"
            type="button"
            onClick={() => setActive(true)}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group absolute inset-0 h-full w-full"
            aria-label={title}
          >
            <img
              src={posterSrc}
              alt={posterAlt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal/30 transition-colors duration-500 group-hover:bg-charcoal/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-alabaster/30 bg-alabaster/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-alabaster/20">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 fill-alabaster"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="font-body text-xs font-medium uppercase tracking-[0.24em] text-alabaster">
                {title}
              </span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <iframe
              title={title}
              src={`https://my.matterport.com/show/?m=${modelId}&play=1&qs=1`}
              allow="xr-spatial-tracking; fullscreen; autoplay"
              allowFullScreen
              loading="lazy"
              className="h-full w-full border-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
