"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Devster",
    handle: "@devster_oss",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    quote: "Damn this is a really useful tool.",
  },
  {
    name: "Swaraj",
    handle: "@swaraj_dev",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    quote: "Crazy useful workspace for developers!",
  },
  {
    name: "Ashutosh",
    handle: "@ashutosh_7",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    quote: "Pretty great stuff — congrats on the launch.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#0E0F10] text-[#E5E5E5]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-neutral-400">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What builders are saying
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            Real feedback from open-source developers on gitbro
          </p>

          {/* Avatar Strip */}
          <div className="flex items-center justify-center -space-x-1.5 pt-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border border-[#0E0F10] bg-neutral-800 flex items-center justify-center text-[10px] font-mono text-neutral-400"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Dashed Grid Container */}
        <div className="relative rounded-2xl border border-dashed border-white/15 bg-[#121315]/50 p-6 md:p-8">
          <span className="absolute -top-3 -left-3 text-neutral-500 font-mono text-lg select-none">
            +
          </span>
          <span className="absolute -top-3 -right-3 text-neutral-500 font-mono text-lg select-none">
            +
          </span>
          <span className="absolute -bottom-3 -left-3 text-neutral-500 font-mono text-lg select-none">
            +
          </span>
          <span className="absolute -bottom-3 -right-3 text-neutral-500 font-mono text-lg select-none">
            +
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/10 bg-[#18191C] p-5 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-9 w-9 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none">{t.name}</h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{t.handle}</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
