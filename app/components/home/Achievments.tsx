"use client";


import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Award, MapPin, Rocket, Store, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * `count` + `suffix` -> animated count-up number.
 * `text`            -> static word shown in place of a number.
 */
type Achievement =
  | {
      tag: string;
      count: number;
      suffix: string;
      label: string;
      icon: LucideIcon;
    }
  | {
      tag: string;
      text: string;
      label: string;
      icon: LucideIcon;
    };

const achievements: Achievement[] = [
  {
    tag: "Impact",
    count: 1,
    suffix: " Million+",
    label: "Lives Empowered & Served",
    icon: MapPin,
  },
  {
    tag: "People",
    count: 400,
    suffix: "+",
    label: "Inspired QnQians Team",
    icon: UsersRound,
  },
  {
    tag: "Network",
    count: 80,
    suffix: "+",
    label: "Active Pharmacy Outlets",
    icon: Store,
  },
  {
    tag: "Leadership",
    text: "Pioneers",
    label: "Healthcare Verticals",
    icon: Award,
  },
  {
    tag: "Reach",
    text: "Regions",
    label: "Across 3 States & UTs",
    icon: Rocket,
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Counts from 0 to `to` once `play` becomes true. */
function CountUp({
  to,
  play,
  reduce,
}: {
  to: number;
  play: boolean;
  reduce: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play || reduce) return undefined;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [play, to, reduce]);

  return <span className="tabular-nums">{reduce ? to : value}</span>;
}

function Stat({
  item,
  index,
  reduce,
}: {
  item: Achievement;
  index: number;
  reduce: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const Icon = item.icon;
  const delay = reduce ? 0 : 0.15 + index * 0.12;

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden border-t border-brand-blue/15 px-1 py-6 sm:px-6 lg:min-h-[280px] lg:border-l lg:border-t-0 lg:py-7 lg:first:border-l-0 lg:first:pl-0"
    >
      {/* Warm fill that rises from the bottom on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gradient-to-t from-[#ffe9a3]/70 via-[#fff3c9]/40 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />

      {/* Gold accent line that draws across the top on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-[3px] w-full origin-left scale-x-0 bg-[#e8b100] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 lg:block"
      />

      {/* Top row: category + icon */}
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue/55 uppercase">
          {String(index + 1).padStart(2, "0")} &nbsp;{item.tag}
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8b100]/40 bg-white/70 text-[#d9a000] transition-all duration-500 ease-out group-hover:rotate-[360deg] group-hover:border-[#e8b100] group-hover:bg-[#e8b100] group-hover:text-white">
          <Icon aria-hidden="true" size={18} strokeWidth={2} />
        </span>
      </div>

      {/* Big value */}
      <div className="my-8 lg:my-0">
        <p
          className="font-light leading-none tracking-[-0.05em] text-brand-blue transition-colors duration-500 group-hover:text-[#d9a000]"
          style={{ fontSize: "clamp(2.5rem, 3.6vw, 3.75rem)" }}
        >
          {"text" in item ? (
            item.text
          ) : (
            <>
              <CountUp to={item.count} play={inView} reduce={reduce} />
              <span className="text-[#e8b100]">{item.suffix}</span>
            </>
          )}
        </p>

        {/* Underline that draws once the card is in view */}
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: delay + 0.3 }}
          className="mt-5 block h-[2px] w-12 origin-left bg-[#e8b100] transition-[width] duration-500 ease-out group-hover:w-24"
        />
      </div>

      {/* Label */}
      <h3 className="max-w-[16ch] text-sm font-bold uppercase leading-5 tracking-[0.08em] text-brand-blue">
        {item.label}
      </h3>
    </motion.article>
  );
}

export default function Achievments() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="achievements-title"
      id="achievements"
      className="relative isolate overflow-hidden bg-[linear-gradient(to_right,rgba(255,201,57,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,201,57,0.10)_1px,transparent_1px),linear-gradient(115deg,#fff8df_0%,#fffdf7_50%,#fff0e4_100%)] bg-[size:60px_60px,60px_60px,auto] py-14 sm:py-16 lg:py-20"
    >
      {/* Soft drifting glows — slow, ambient, never distracting */}
      {!reduce && (
        <>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-[#ffd454]/30 blur-3xl"
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-[360px] w-[360px] rounded-full bg-[#ffb86b]/20 blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="achievements-container site-container">
        {/* Header */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 text-xs font-semibold tracking-[0.25em] text-brand-green uppercase"
            >
              <span>Our Achievements</span>
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                className="block h-px w-16 origin-left bg-brand-green/60"
              />
            </motion.div>

            {/* Each line slides up from behind a mask */}
            <h2
              id="achievements-title"
              className="mt-4 font-medium leading-[0.98] tracking-[-0.055em] text-brand-blue"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE }}
                >
                  Milestones that
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block text-[#e8b100]"
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE, delay: 0.12 }}
                >
                  define our excellence.
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="max-w-xs text-[17px] leading-8 text-brand-copy lg:pb-3 lg:text-right"
          >
            Growing with intention. Measuring what matters.
          </motion.p>
        </header>

        {/* Stats — the top rule draws in, then columns rise in sequence */}
        <div className="relative mt-10 lg:mt-12">
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute left-0 top-0 hidden h-px w-full origin-left bg-brand-blue/20 lg:block"
          />

          <div className="achievements-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {achievements.map((item, index) => (
              <Stat
                key={item.label}
                item={item}
                index={index}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}