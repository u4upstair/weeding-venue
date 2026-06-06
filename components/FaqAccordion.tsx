"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/constants/dummyData";

export default function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <div className="border-t border-charcoal/10">
      {faqItems.map((item) => {
        const isOpen = item.id === open;
        return (
          <div key={item.id} className="border-b border-charcoal/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-8 py-7 text-left"
            >
              <span className="font-heading text-xl text-charcoal lg:text-2xl">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 font-body text-2xl font-light text-charcoal/50"
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
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 font-body text-base font-light leading-relaxed text-charcoal/65">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
